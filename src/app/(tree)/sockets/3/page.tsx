'use client';
import React from 'react';
import { useCryptoTrades } from '@/components/sockets/3/useCryptoTrades';

const CryptoTradeCard = ({ symbol }: { symbol: string }) => {
  const trades = useCryptoTrades(symbol);

  return (
    <div className="rounded-lg bg-blue-900 p-4 text-center shadow-md">
      <h3>{symbol}</h3>
      <ul>
        {trades.map((trade, index) => (
          <li key={index}>
            {new Date(trade.time).toLocaleTimeString()} - Price: {trade.price},
            Quantity: {trade.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'XRPUSDT', 'SOLUSDT'];

  return (
    <div className="dashboard">
      <h1>Crypto Live Trades</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {symbols.map((symbol) => (
          <CryptoTradeCard key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}
