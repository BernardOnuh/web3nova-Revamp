"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";
import { formatNaira } from "@/lib/bootcamp";

// Bank transfers can take a moment to be confirmed, so poll for a while.
const MAX_ATTEMPTS = 10;
const INTERVAL_MS = 4000;

export default function BootcampSuccess({ paymentReference }) {
  const [state, setState] = useState({ phase: "loading", data: null });

  useEffect(() => {
    if (!paymentReference) return;
    let attempts = 0;
    let timer;
    let cancelled = false;

    const check = async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/bootcamp/verify?ref=${encodeURIComponent(paymentReference)}`);
        const data = await res.json();
        if (cancelled) return;
        if (res.ok && data.paid) return setState({ phase: "paid", data });
        if (res.ok && ["FAILED", "CANCELLED", "EXPIRED"].includes(data.status)) {
          return setState({ phase: "failed", data });
        }
      } catch {
        // retry below
      }
      if (cancelled) return;
      if (attempts < MAX_ATTEMPTS) timer = setTimeout(check, INTERVAL_MS);
      else setState({ phase: "pending", data: null });
    };

    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [paymentReference]);

  const { phase, data } = state;

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-32 pb-20 flex justify-center">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center h-fit">
        {phase === "loading" && (
          <>
            <Loader2 className="w-14 h-14 mx-auto text-blue-400 animate-spin mb-4" />
            <h1 className="text-2xl font-bold mb-2">Confirming your payment…</h1>
            <p className="text-gray-400">This can take a few seconds.</p>
          </>
        )}

        {phase === "paid" && (
          <>
            <CheckCircle2 className="w-14 h-14 mx-auto text-green-400 mb-4" />
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              You&apos;re in, {data.name.split(" ")[0]}!
            </h1>
            <p className="text-gray-400 mb-6">
              Your seat in the 16-week bootcamp is confirmed. A confirmation email is on its way.
            </p>
            <dl className="text-sm space-y-2 text-left bg-black/40 rounded-xl p-4 mb-6">
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Course</dt><dd className="text-right">{data.course}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Location</dt><dd className="text-right">{data.location}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Amount</dt><dd className="text-right">{formatNaira(data.amount)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Reference</dt><dd className="text-right break-all">{data.paymentReference}</dd></div>
            </dl>
          </>
        )}

        {phase === "pending" && (
          <>
            <Clock className="w-14 h-14 mx-auto text-yellow-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment still processing</h1>
            <p className="text-gray-400 mb-6">
              If you paid by bank transfer it may take a few minutes. You&apos;ll get an email as soon as it&apos;s confirmed.
              Reference: <span className="text-white break-all">{paymentReference}</span>
            </p>
          </>
        )}

        {phase === "failed" && (
          <>
            <XCircle className="w-14 h-14 mx-auto text-red-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment not completed</h1>
            <p className="text-gray-400 mb-6">No money was taken for this attempt. You can try again.</p>
            <Link href="/bootcamp" className="inline-block px-8 py-3 rounded-full font-bold bg-gradient-to-r from-blue-400 to-yellow-400 text-black">
              Try again
            </Link>
          </>
        )}

        {phase !== "failed" && phase !== "loading" && (
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">Back to home</Link>
        )}
      </div>
    </div>
  );
}
