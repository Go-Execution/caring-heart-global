"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["About us", "/about"], ["Mission & vision", "/our-mission-vision"], ["Our team", "/our-team"], ["Programs", "/programs"]] as const;
export function Header() {
    const [open, setOpen] = useState(false); useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = "" } }, [open]); return <header className="sticky top-0 z-50 isolate bg-white">
        <Link href="/programs" className="flex h-10 items-center justify-center gap-3 bg-[#222] px-4 text-center text-xs font-medium text-white">See how a small act can create lasting change <ArrowRight size={15} /></Link>
        <div className="container-shell flex h-20 items-center justify-between lg:h-24">
            <Link href="/" className="flex items-center gap-3"><Image src="/images/brand-mark.webp" alt="Caring Hearts Global" width={140} height={100} className="h-16 w-auto object-contain lg:h-20" priority /></Link>
            <nav className="hidden items-center gap-1 rounded-full border border-black/[.06] p-1.5 shadow-sm lg:flex" aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href} className="flex items-center gap-1 rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[#f7f4f0]">{label}</Link>)}</nav>
            <div className="hidden items-center gap-2 lg:flex"><Link href="/contact" className="button-light !bg-[#f7f4f0]">Contact</Link><Link href="/giving-page-1-1" className="button-ghost">Donate <ArrowRight size={17} /></Link></div>
            <button onClick={() => setOpen(v => !v)} className="grid h-12 w-12 place-items-center rounded-full bg-[#f7f4f0] lg:hidden" aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="fixed inset-x-0 top-[120px] z-[60] h-[calc(100dvh-120px)] overflow-y-auto overscroll-contain bg-white px-6 py-6 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex min-h-full w-full max-w-[1180px] flex-col">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-black/10 py-4 text-3xl font-medium">{label}</Link>)}<div className="mt-auto grid gap-3 pt-8"><Link href="/contact" onClick={() => setOpen(false)} className="button-light !bg-[#f7f4f0]">Contact us</Link><Link href="/giving-page-1-1" onClick={() => setOpen(false)} className="button-ghost">Donate now <ArrowRight size={17} /></Link></div></div></nav>}
    </header>
}
