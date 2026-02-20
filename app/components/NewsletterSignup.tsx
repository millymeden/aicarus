"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");
      setState("success");
    } else {
      setState("error");
    }
  }

  return (
    <section className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold">Get Aicarus updates</h2>
        <p className="mt-2 text-gray-600">
          Plain-language briefings on AI safety, governance, and key developments.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full max-w-xs rounded-md border px-4 py-2"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {state === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {state === "success" && (
          <p className="mt-4 text-green-700">Subscribed — welcome aboard.</p>
        )}
        {state === "error" && (
          <p className="mt-4 text-red-700">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}