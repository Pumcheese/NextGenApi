import type { APIRoute } from "astro";
import { createSession, verifyPassword } from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import { ensureSameOrigin, getClientIp } from "../../../lib/http";
import { resolveLang } from "../../../lib/i18n";
import { takeRateLimit } from "../../../lib/rate-limit";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!ensureSameOrigin({ request, url: new URL(request.url) })) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), { status: 403 });
  }

  const formData = await request.formData();
  const lang = resolveLang(value(formData, "lang"));
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const rateLimit = takeRateLimit(`admin-login:${getClientIp({ request, url: new URL(request.url) })}`, 5, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return redirect(`/${lang}/admin/login?error=rate-limit`, 303);
  }

  if (!email || !password) {
    return redirect(`/${lang}/admin/login?error=Credenciales%20incorrectas`, 303);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return redirect(`/${lang}/admin/login?error=Credenciales%20incorrectas`, 303);
  }

  const passwordValid = await verifyPassword(password, user.passwordHash);

  if (!passwordValid) {
    return redirect(`/${lang}/admin/login?error=Credenciales%20incorrectas`, 303);
  }

  await createSession(cookies, user.id);

  return redirect(`/${lang}/admin`, 303);
};
