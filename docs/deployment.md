# Deployment Guide

## Stack

- Frontend and server rendering: Astro
- Hosting target: Vercel
- Database: PostgreSQL
- ORM: Prisma

## Required environment variables

Create the variables in Vercel with the same names used locally:

- `DATABASE_URL`
- `SESSION_SECRET`

`SESSION_SECRET` must be a long random value in production. The application now rejects the placeholder secret in production mode.

## Recommended deployment flow

1. Create a PostgreSQL database for production.
2. Add `DATABASE_URL` and `SESSION_SECRET` in Vercel.
3. Trigger a build in Vercel.
4. Run `npm run db:push` against the production database once the environment variables are available.
5. Create the first admin user with:

```powershell
npm run seed:admin -- admin@yourcompany.com StrongPassword123 "Admin User"
```

## Local preflight before deploy

Run these commands locally:

```powershell
npm install
npm run build
```

If the build passes, the project is ready for Vercel packaging.

## Notes

- The project includes `postinstall: prisma generate`, which helps Vercel generate the Prisma client during install.
- Admin routes send `Cache-Control: no-store`.
- Login and contact endpoints include basic rate limiting and same-origin checks.
