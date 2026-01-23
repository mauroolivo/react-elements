"use client";
import { useEffect, useRef, useState } from "react";

export default function Server1() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  console.log("Render Server1 component");

  useEffect(() => {
    // create socket and attach handlers
    if (typeof window === "undefined") return;

    const createSocket = () => {
      try {
        const websocket = new WebSocket("ws://localhost:8080");
        wsRef.current = websocket;

        const handleOpen = () => {
          console.log("Connected to WebSocket server");
          setConnected(true);
        };

        const handleMessage = (event: MessageEvent) => {
          const data = event.data;
          if (typeof data === "string") {
            setMessages((prev) => [...prev, data]);
            return;
          }

          if (data instanceof Blob) {
            data
              .text()
              .then((text) => setMessages((prev) => [...prev, text]))
              .catch(() => {});
            return;
          }
          if (data instanceof ArrayBuffer) {
            const text = new TextDecoder().decode(data);
            setMessages((prev) => [...prev, text]);
            return;
          }
          setMessages((prev) => [...prev, String(data)]);
        };

        const handleClose = () => {
          console.log("Disconnected from WebSocket server");
          setConnected(false);
        };

        websocket.addEventListener("open", handleOpen);
        websocket.addEventListener("message", handleMessage);
        websocket.addEventListener("close", handleClose);

        return () => {
          websocket.removeEventListener("open", handleOpen);
          websocket.removeEventListener("message", handleMessage);
          websocket.removeEventListener("close", handleClose);
          try {
            websocket.close();
          } catch (e) {
            console.error("Error closing WebSocket:", e);
          }
        };
      } catch (e) {
        console.error("WebSocket error", e);
        return () => {};
      }
    };

    const cleanup = createSocket();
    return () => {
      cleanup && cleanup();
      wsRef.current = null;
    };
  }, []);

  const sendMessage = () => {
    const socket = wsRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    }
  };

  const disconnect = () => {
    const socket = wsRef.current;
    if (socket) {
      try {
        socket.close();
      } catch (e) {
        console.log("Error closing WebSocket:", e);
      }
      wsRef.current = null;
      setConnected(false);
    }
  };

  const reconnect = () => {
    // if already connected, do nothing
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;
    // ensure previous socket closed
    try {
      wsRef.current?.close();
    } catch {}
    wsRef.current = null;
    // create a fresh socket (reuse logic from effect)
    try {
      const websocket = new WebSocket("ws://localhost:8080");
      wsRef.current = websocket;

      websocket.addEventListener("open", () => setConnected(true));
      websocket.addEventListener("message", (event: MessageEvent) => {
        const data = event.data;
        if (typeof data === "string") {
          setMessages((prev) => [...prev, data]);
          return;
        }
        if (data instanceof Blob) {
          data
            .text()
            .then((text) => setMessages((prev) => [...prev, text]))
            .catch(() => {});
          return;
        }
        if (data instanceof ArrayBuffer) {
          const text = new TextDecoder().decode(data);
          setMessages((prev) => [...prev, text]);
          return;
        }
        setMessages((prev) => [...prev, String(data)]);
      });
      websocket.addEventListener("close", () => setConnected(false));
    } catch (e) {
      console.error("Reconnect failed", e);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Live Chat</h2>
        <span
          className={`text-sm px-2 py-1 rounded-full ${connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
        >
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      <div className="flex-1 h-64 overflow-y-auto mb-3 bg-gray-50 p-3 rounded-md flex flex-col gap-2">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="self-start">
              <div className="inline-block bg-white border border-gray-200 p-2 rounded-lg shadow-sm max-w-full overflow-x-auto">
                <p className="text-sm text-gray-800 whitespace-nowrap">
                  {message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 px-3 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          disabled={!connected}
          className="px-3 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
        {connected ? (
          <button
            onClick={disconnect}
            className="px-3 py-2 bg-red-500 text-white rounded-md"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={reconnect}
            className="px-3 py-2 bg-yellow-500 text-white rounded-md"
          >
            Reconnect
          </button>
        )}
      </div>
    </div>
  );
}
