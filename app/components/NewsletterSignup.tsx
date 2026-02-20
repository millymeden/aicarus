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
    <section className="mt-14">
      <div className="divider" />

      <div className="panel p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="max-w-xl">
            <div className="kicker">Newsletter</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
              Get Aicarus updates
            </h2>
            <p className="mt-2 text-gray-600">
              Plain-language briefings on AI safety, governance, and key developments.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
        >
            <input
            type="email"
            required
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="you@example.com"
             className="input w-full sm:flex-1"
            />

            <button
            type="submit"
             disabled={state === "loading"}
            className="btn-accent whitespace-nowrap disabled:opacity-60 px-6 py-3 text-base"
        >
         {state === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {state === "success" && (
          <p className="mt-4 text-sm text-green-700">
            Subscribed. Welcome aboard.
          </p>
        )}

        {state === "error" && (
          <p className="mt-4 text-sm text-red-700">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}