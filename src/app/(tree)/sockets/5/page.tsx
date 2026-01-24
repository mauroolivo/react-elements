'use client';

import { useEffect, useMemo, useRef, useState, startTransition } from 'react';
import useSWR from 'swr';
import {
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Candle = {
  openTime: number;
  closeTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  closed: boolean;
};

const MAX_CANDLES = 180; // keep about 3 hours of 1m candles
const WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1m';
const REST_URL = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=${MAX_CANDLES}`;

function useBinanceKlines() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Seed with recent history via SWR
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });

  const { data: restData, error: restError } = useSWR(REST_URL, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (!restData) return;
    try {
      if (!Array.isArray(restData)) return;
      const parsed: Candle[] = restData
        .map((item: unknown) => {
          if (!Array.isArray(item) || item.length < 7) return null;
          const [openTime, open, high, low, close, , closeTime] = item as [
            number,
            string,
            string,
            string,
            string,
            unknown,
            number,
          ];
          return {
            openTime,
            closeTime,
            open: parseFloat(open),
            high: parseFloat(high),
            low: parseFloat(low),
            close: parseFloat(close),
            closed: true,
          } as Candle;
        })
        .filter(Boolean) as Candle[];

      startTransition(() => {
        setCandles(parsed.slice(-MAX_CANDLES));
      });
    } catch (err) {
      console.error('Binance REST klines parse error', err);
    }
  }, [restData]);

  useEffect(() => {
    if (restError) console.error('SWR error fetching klines', restError);
  }, [restError]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const k = data.k;
        if (!k) return;

        const candle: Candle = {
          openTime: k.t,
          closeTime: k.T,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
          closed: Boolean(k.x),
        };

        if (!Number.isFinite(candle.close) || !Number.isFinite(candle.low))
          return;

        startTransition(() => {
          setCandles((prev) => {
            const last = prev[prev.length - 1];
            let next: Candle[];

            if (last && last.openTime === candle.openTime) {
              // Update in-flight candle
              next = [...prev.slice(0, -1), candle];
            } else {
              // New minute: push and shift window
              next = [...prev, candle];
            }

            // Keep a fixed window
            next = next.slice(-MAX_CANDLES);

            return next;
          });
        });
      } catch (err) {
        console.error('Binance kline parse error', err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return { candles, connected };
}

export default function Page() {
  const { candles, connected } = useBinanceKlines();
  const latest = candles.at(-1);
  const first = candles.at(0);
  const change =
    latest && first ? ((latest.close - first.open) / first.open) * 100 : 0;

  const chartData = useMemo(
    () =>
      candles.map((c) => ({
        time: new Date(c.openTime).toISOString(),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    [candles]
  );

  const { min, max } = useMemo(() => {
    if (!candles.length) return { min: 0, max: 0 };
    const lows = candles.map((c) => c.low);
    const highs = candles.map((c) => c.high);
    return { min: Math.min(...lows), max: Math.max(...highs) };
  }, [candles]);

  const isLoading = candles.length === 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-slate-400 uppercase">
              Live
            </p>
            <h1 className="text-2xl font-semibold">BTC / USDT</h1>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-400'}`}
              aria-label={connected ? 'connected' : 'disconnected'}
            />
            <span className="text-slate-200">
              {connected ? 'Live' : 'Reconnecting'}
            </span>
            <span className="font-mono text-lg">
              {latest ? latest.close.toFixed(2) : '--'}
            </span>
            <span
              className={`text-sm font-medium ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
            >
              {latest
                ? `${change >= 0 ? '▲' : '▼'} ${Math.abs(change).toFixed(2)}%`
                : ''}
            </span>
          </div>
        </header>

        <div className="overflow-hidden rounded-2xl bg-slate-800/60 p-4 shadow-xl ring-1 ring-slate-700/60">
          {isLoading ? (
            <div className="flex h-[420px] items-center justify-center text-slate-300">
              <div className="flex items-center gap-3 rounded-lg bg-slate-900/60 px-4 py-3 text-sm">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-emerald-400" />
                <span>Waiting for first candle…</span>
              </div>
            </div>
          ) : (
            <div className="relative h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="rgba(148,163,184,0.06)" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                    minTickGap={20}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[min, max]}
                    tickFormatter={(v) => Number(v).toFixed(0)}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                    formatter={(value) => Number(value).toFixed(2)}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1000 420"
                aria-hidden="true"
              >
                {chartData.map((d, i) => {
                  const padding = 8;
                  const innerWidth = 1000 - padding * 2;
                  const innerHeight = 420 - padding * 2;
                  const stepX = innerWidth / Math.max(chartData.length, 1);
                  const xCenter = padding + i * stepX + stepX / 2;
                  const range = max - min || 1;
                  const yScale = (price: number) =>
                    padding + (1 - (price - min) / range) * innerHeight;
                  const yOpen = yScale(d.open);
                  const yClose = yScale(d.close);
                  const yHigh = yScale(d.high);
                  const yLow = yScale(d.low);
                  const candleWidth = Math.max(2, Math.min(14, stepX * 0.7));
                  const left = xCenter - candleWidth / 2;
                  const top = Math.min(yOpen, yClose);
                  const height = Math.max(1, Math.abs(yClose - yOpen));
                  const color = d.close >= d.open ? '#34d399' : '#fb7185';

                  return (
                    <g key={d.time + '-' + i}>
                      <line
                        x1={xCenter}
                        x2={xCenter}
                        y1={yHigh}
                        y2={yLow}
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                      <rect
                        x={left}
                        y={top}
                        width={candleWidth}
                        height={height}
                        fill={color}
                        rx={candleWidth * 0.12}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-300 sm:grid-cols-4">
            <div className="rounded-lg bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">Last close</p>
              <p className="text-lg font-semibold text-slate-100">
                {latest ? latest.close.toFixed(2) : '--'}
              </p>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">Change (session)</p>
              <p
                className={`text-lg font-semibold ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {latest ? `${change.toFixed(2)}%` : '--'}
              </p>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">High (session)</p>
              <p className="text-lg font-semibold text-slate-100">
                {candles.length ? max.toFixed(2) : '--'}
              </p>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">Low (session)</p>
              <p className="text-lg font-semibold text-slate-100">
                {candles.length ? min.toFixed(2) : '--'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Data: Binance 1m kline stream (btcusdt@kline_1m).
        </p>
      </div>
    </div>
  );
}
