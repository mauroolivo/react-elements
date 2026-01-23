import { useEffect, useState } from "react";

interface Trade {
  price: string;
  quantity: string;
  symbol: string;
  time: number;
}

export const useCryptoTrades = (symbol: string) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const trade: Trade = {
        price: data.p,
        quantity: data.q,
        symbol: data.s,
        time: data.T,
      };
      setTrades((prevTrades) => [...prevTrades.slice(-9), trade]); // Keep the last 10 trades
    };

    return () => ws.close(); // Cleanup on component unmount
  }, [symbol]);

  return trades;
};
