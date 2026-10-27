"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-3.5 text-white outline-none transition placeholder:text-white/38 focus:border-[#ffe319] focus:ring-2 focus:ring-[#ffe319]/20";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not send your message.");
      }

      form.reset();
      setSubmitState("success");
      setMessage("Thank you. Your message has been sent to our team.");
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white/85">
          Full name
          <input className={fieldClass} name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" />
        </label>
        <label className="text-sm font-semibold text-white/85">
          Email address
          <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@example.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white/85">
          Phone <span className="font-normal text-white/45">(optional)</span>
          <input className={fieldClass} name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Your phone number" />
        </label>
        <label className="text-sm font-semibold text-white/85">
          How can we help?
          <select className={fieldClass} name="inquiryType" defaultValue="General question" required>
            <option className="text-[#183f35]">General question</option>
            <option className="text-[#183f35]">Volunteering</option>
            <option className="text-[#183f35]">Partnership</option>
            <option className="text-[#183f35]">Donation</option>
          </select>
        </label>
      </div>

      <label className="text-sm font-semibold text-white/85">
        Message
        <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" minLength={10} maxLength={3000} required placeholder="Tell us how you would like to get involved." />
      </label>

      <label className="flex items-start gap-3 text-sm leading-6 text-white/65">
        <input className="mt-1 h-4 w-4 accent-[#ffe319]" name="consent" type="checkbox" value="yes" required />
        I agree that Caring Hearts Global may use these details to respond to my inquiry.
      </label>

      <div className="hidden" aria-hidden="true">
        <label>Leave this field empty<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="button-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? <>Sending <LoaderCircle size={18} className="animate-spin" /></> : <>Send message <ArrowRight size={18} /></>}
        </button>
        <p className={`text-sm ${submitState === "error" ? "text-[#ffb4a8]" : "text-white/75"}`} aria-live="polite">
          {submitState === "success" && <CheckCircle2 className="mr-2 inline" size={18} />}
          {message}
        </p>
      </div>
    </form>
  );
}
