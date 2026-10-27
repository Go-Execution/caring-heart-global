# Caring Hearts Global Relief & Development

A complete Next.js redesign for Caring Hearts Global Relief & Development, a 501(c)(3) nonprofit supporting children and families across Africa.

## Pages

- Home
- About
- Mission & Vision
- Programs
- Our Team
- Donation
- Contact

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form email setup

The contact form sends messages through Resend. Configure these server-only
environment variables locally in `.env.local` and in the deployment platform:

```bash
RESEND_API_KEY=re_your_key
CONTACT_TO_EMAIL=contact@caringheartsglobal.org
CONTACT_FROM_EMAIL="Caring Hearts Website <website@caringheartsglobalrelief.org>"
```

`RESEND_API_KEY` must never use the `NEXT_PUBLIC_` prefix or be committed to Git.

## Quality checks

```bash
npm run lint
npm run build
```

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Vercel deployment
