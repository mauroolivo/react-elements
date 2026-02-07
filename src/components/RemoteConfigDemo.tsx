"use client";

import { useEffect, useState } from "react";
import {
  fetchAndActivateRemoteConfig,
  getRemoteConfigValue,
} from "../lib/firebase";

export default function RemoteConfigDemo() {
  const [message, setMessage] = useState<string>("loading...");
  const [status, setStatus] = useState<"idle" | "fetching" | "done" | "error">(
    "idle",
  );
  const [fetchOk, setFetchOk] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setStatus("fetching");
      try {
        const ok = await fetchAndActivateRemoteConfig();
        if (!mounted) return;
        setFetchOk(ok);
        // ok === true means fetched+activated; ok === false may mean no-new-values or a fetch failure.
        const val = getRemoteConfigValue(
          "welcome_message",
          ok ? "(no value)" : "failed",
        );
        setMessage(val);
        setStatus("done");
      } catch (e) {
        console.log("Remote Config error", e);
        if (!mounted) return;
        setFetchOk(false);
        setMessage(getRemoteConfigValue("welcome_message", "failed"));
        setStatus("error");
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <strong>Remote Config demo</strong>
      <div>Status: {status}</div>
      <div>
        Fetch: {fetchOk === null ? "pending" : fetchOk ? "ok" : "failed"}
      </div>
      <div>Value: {message}</div>
    </div>
  );
}
