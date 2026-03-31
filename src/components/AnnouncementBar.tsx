"use client";

import { useState } from "react";

const messages = [
  { text: "Original color screen — vivid panels, true blacks", icon: "📱" },
  { text: "Tech Tonic — phones, displays & accessories", icon: "✦" },
  { text: "COD checkout — pay the rider on delivery", icon: "↩" },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const m = messages[i % messages.length];

  return (
    <div className="border-b border-zinc-800 bg-zinc-950 text-center text-sm text-zinc-300 sm:text-base">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          aria-label="Previous"
          className="rounded p-1 text-zinc-500 hover:text-zinc-200"
          onClick={() => setI((x) => (x - 1 + messages.length) % messages.length)}
        >
          ‹
        </button>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden>{m.icon}</span>
          <span>{m.text}</span>
        </span>
        <button
          type="button"
          aria-label="Next"
          className="rounded p-1 text-zinc-500 hover:text-zinc-200"
          onClick={() => setI((x) => (x + 1) % messages.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
