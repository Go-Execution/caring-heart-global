import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <><PageHero eyebrow="Contact us" title="Let’s start a conversation that matters." description="We’d love to hear from you. Whether you have questions, want to get involved, or would like to learn more about our work, please don’t hesitate to reach out."/>
    <section className="bg-[#f7f3e9] py-20 lg:py-28"><div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <div><p className="eyebrow text-[#c76542]">Reach us directly</p><h2 className="display-title mt-4 text-5xl font-semibold">We’re here to help.</h2><p className="mt-5 leading-7 text-[#18342d]/68">Please email us at contact@caringheartsglobal.org. We aim to respond within 48 hours.</p><p className="mt-4 leading-7 text-[#18342d]/68">Thank you for supporting Caring Hearts Global Relief and Development—together, we’re making a difference.</p>
        <div className="mt-8 grid gap-4"><a href="mailto:contact@caringheartsglobal.org" className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#dce8df] text-[#236958]"><Mail size={20}/></span>contact@caringheartsglobal.org</a><a href="tel:+12253840471" className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#dce8df] text-[#236958]"><Phone size={20}/></span>(225) 384-0471</a><p className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#dce8df] text-[#236958]"><MapPin size={20}/></span>Baton Rouge, Louisiana</p></div>
      </div>
      <div className="rounded-[2rem] bg-[#153f35] p-8 text-white sm:p-12"><p className="eyebrow text-[#e1aa4d]">Ready when you are</p><h2 className="mt-4 text-4xl font-semibold">Tell us how you’d like to get involved.</h2><p className="mt-5 leading-7 text-white/70">Share a few details below and our team will respond within 48 hours.</p><ContactForm /><div className="mt-10 border-t border-white/15 pt-8"><p className="text-2xl font-bold">Partnerships · Volunteering · General questions</p><p className="mt-2 text-sm text-white/55">One inbox, the right person, a thoughtful reply.</p></div></div>
    </div></section>
  </>;
}
