import type { APIRoute } from "astro";
import { prisma } from "../../../../../lib/db";
import { ensureSameOrigin, getSafeAdminReturnPath } from "../../../../../lib/http";
import { resolveLang } from "../../../../../lib/i18n";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (!ensureSameOrigin({ request, url: new URL(request.url) })) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), { status: 403 });
  }

  const id = Number(params.id);
  const formData = await request.formData();
  const lang = resolveLang(String(formData.get("lang") || "es"));
  const returnTo = getSafeAdminReturnPath(formData.get("returnTo"), lang);

  if (!Number.isInteger(id)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }

  await prisma.contact.delete({
    where: { id },
  });

  return redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}deleted=1`, 303);
};
