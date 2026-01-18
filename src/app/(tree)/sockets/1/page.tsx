"use client";
import { useState } from "react";
import Live1 from "@/components/sockets/1/Server1";

export default function Page() {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <h1>Socket Page 1</h1>

      <label className="block mb-2">
        <span className="text-sm text-gray-600">Message</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          placeholder="Type something..."
        />
      </label>

      <Live1 />
    </div>
  );
}
