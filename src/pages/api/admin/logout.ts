import type { APIRoute } from "astro";
import { clearSession } from "../../../lib/auth";
import { ensureSameOrigin } from "../../../lib/http";
import { resolveLang } from "../../../lib/i18n";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!ensureSameOrigin({ request, url: new URL(request.url) })) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), { status: 403 });
  }

  const formData = await request.formData();
  const lang = resolveLang(String(formData.get("lang") || "es"));
  clearSession(cookies);
  return redirect(`/${lang}/admin/login`, 303);
};
