# GameClub Raffle

A ticketed prize-draw platform with one-time-code sign-up, live activity feed and an admin draw console.

![GameClub Raffle](docs/screenshot.png)

## Overview

A single-page experience for running a prize draw. Visitors see the prize, the rules and a live feed of activity, sign up with an email code, buy a ticket package, and receive a tracking code for every ticket.

Administrators open a console inside the same page to configure the draw, watch sales statistics, run the draw and reset it for the next round.

## Features

- **One-time-code sign-up.** Registration is confirmed by a code sent to the user's email before an account is created.
- **Ticket packages.** Several package sizes, bought through a payment dialog that issues the tickets on success.
- **My tickets.** Signed-in users see every ticket they hold with its tracking code.
- **Live feed.** A running feed of recent activity and a section for past winners.
- **Admin draw console.** Configure the draw, view statistics, pick the winner and reset.
- **Celebration.** A confetti animation when a purchase or a draw completes.

## Engineering notes

- **Hand-written SQL on SQL Server.** A schema of users, raffles, orders and tickets with indexes on the lookup columns, queried directly through the mssql driver.
- **Stateless authentication.** Passwords hashed with bcrypt, sessions carried in signed JSON Web Tokens, with register, login, logout and current-user endpoints.
- **Email delivery.** One-time codes sent through Nodemailer, with separate send and verify endpoints.
- **Clear API surface.** Thirteen route handlers grouped into auth, tickets, raffle, user and admin.
- **Latest framework versions.** Built on Next.js 16, React 19 and Tailwind CSS 4.

## Architecture

| Layer | What it does |
| --- | --- |
| Page | Hero, prize specs, packages, how it works, live feed, winners, rules |
| Modals | Auth, payment, my tickets, admin console |
| API routes | auth, tickets/buy, raffle, user/tickets, admin |
| Library | Token helpers, database pool, mailer |
| SQL Server | Users, Raffles, Orders, Tickets |

## Tech stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Route handlers, JWT, bcrypt, Nodemailer
- **Data:** Microsoft SQL Server, mssql driver, SQL schema and queries

## Run locally

Requires Node.js 20+ and Microsoft SQL Server.

Create the database with `database/schema.sql`, copy `.env.example` to `.env.local` and fill in your own values, then:

```bash
npm install
```

```bash
npm run dev
```

## Author

Built by Amin.
