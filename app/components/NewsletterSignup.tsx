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
    <section className="mt-20 border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Get Aicarus updates
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
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
            className="w-full max-w-xs rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />

          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {state === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
          No spam. Unsubscribe anytime.
        </p>

        {state === "success" && (
          <p className="mt-4 text-green-600 dark:text-green-400">
            Subscribed — welcome aboard.
          </p>
        )}

        {state === "error" && (
          <p className="mt-4 text-red-600 dark:text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}