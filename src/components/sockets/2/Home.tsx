import { Cursor } from "./Cursor";
import useWebSocket from "react-use-websocket";
import React, { JSX, useEffect, useRef } from "react";
import throttle from "lodash.throttle";

// type Point = { x: number; y: number };

interface UserState {
  state: { x: number; y: number };
}

type UsersMap = Record<string, UserState>;

const renderCursors = (users: UsersMap) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    return (
      <Cursor key={uuid} userId={uuid} point={[user.state.x, user.state.y]} />
    );
  });
};

const renderUsersList = (users: UsersMap): JSX.Element => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        const u = users[uuid];
        return (
          <li key={uuid}>
            <strong>{uuid}</strong>: x={u.state.x}, y={u.state.y}
          </li>
        );
      })}
    </ul>
  );
};

interface HomeProps {
  username: string;
}

export function Home({ username }: HomeProps): JSX.Element | null {
  const WS_URL = `ws://127.0.0.1:8000`;
  const ws = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username },
  }) as unknown as {
    sendJsonMessage?: (d: unknown) => void;
    lastJsonMessage?: UsersMap | null;
  };

  const { sendJsonMessage, lastJsonMessage } = ws;

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef<(d: unknown) => void>(() => {});

  useEffect(() => {
    if (typeof sendJsonMessage === "function") {
      try {
        sendJsonMessage({ x: 0, y: 0 });
      } catch (e) {
        console.error("Initial sendJsonMessage error:", e);
      }

      sendJsonMessageThrottled.current = throttle((d: unknown) => {
        try {
          (sendJsonMessage as (d: unknown) => void)(d);
        } catch (e) {
          console.error("sendJsonMessage error:", e);
        }
      }, THROTTLE);
    }

    const handler = (e: MouseEvent) => {
      sendJsonMessageThrottled.current({
        x: (e as MouseEvent).clientX,
        y: (e as MouseEvent).clientY,
      });
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      const fnCancelable = sendJsonMessageThrottled.current as unknown as {
        cancel?: () => void;
      };
      if (fnCancelable.cancel) fnCancelable.cancel();
    };
  }, [sendJsonMessage]);

  if (lastJsonMessage) {
    return (
      <>
        {renderUsersList(lastJsonMessage)}
        {renderCursors(lastJsonMessage)}
      </>
    );
  }

  return null;
}
