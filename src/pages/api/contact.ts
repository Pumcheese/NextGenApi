import type { APIRoute } from "astro";
import { prisma } from "../../lib/db";
import { ensureSameOrigin, getClientIp } from "../../lib/http";
import { resolveLang } from "../../lib/i18n";
import { takeRateLimit } from "../../lib/rate-limit";

function sanitize(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function errorResponse(isJson: boolean, message: string, lang: string, redirect: APIRoute["redirect"]) {
  if (isJson) {
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  return redirect(`/${lang}/contact?error=1`, 303);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  if (!ensureSameOrigin({ request, url: new URL(request.url) })) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());

  const name = sanitize(payload.name);
  const company = sanitize(payload.company);
  const email = sanitize(payload.email).toLowerCase();
  const phone = sanitize(payload.phone);
  const service = sanitize(payload.service);
  const requestType = sanitize(payload.requestType);
  const message = sanitize(payload.message);
  const lang = resolveLang(sanitize(payload.lang));
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = !phone || /^[0-9+()\-\s]{7,30}$/.test(phone);
  const rateLimit = takeRateLimit(`contact:${getClientIp({ request, url: new URL(request.url) })}`, 8, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    if (isJson) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      });
    }

    return redirect(`/${lang}/contact?error=rate-limit`, 303);
  }

  if (!name || !email || !message) {
    return errorResponse(isJson, "Missing required fields", lang, redirect);
  }

  if (name.length < 2) {
    return errorResponse(isJson, "Name is too short", lang, redirect);
  }

  if (!emailValid) {
    return errorResponse(isJson, "Invalid email address", lang, redirect);
  }

  if (!phoneValid) {
    return errorResponse(isJson, "Invalid phone number", lang, redirect);
  }

  if (message.length < 12) {
    return errorResponse(isJson, "Message is too short", lang, redirect);
  }

  await prisma.contact.create({
    data: {
      name,
      company: company || null,
      email,
      phone: phone || null,
      service: service || null,
      requestType: requestType || null,
      message,
    },
  });

  if (isJson) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  }

  return redirect(`/${lang}/contact?sent=1`, 303);
};
