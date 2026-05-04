import type { APIRoute } from "astro";
import { prisma } from "../../../../../lib/db";
import { ensureSameOrigin, getSafeAdminReturnPath } from "../../../../../lib/http";
import { resolveLang } from "../../../../../lib/i18n";

const allowedStatuses = new Set(["PENDING", "REVIEWED", "RESPONDED"]);

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (!ensureSameOrigin({ request, url: new URL(request.url) })) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), { status: 403 });
  }

  const id = Number(params.id);
  const formData = await request.formData();
  const status = String(formData.get("status") || "");
  const lang = resolveLang(String(formData.get("lang") || "es"));
  const returnTo = getSafeAdminReturnPath(formData.get("returnTo"), lang);

  if (!Number.isInteger(id) || !allowedStatuses.has(status)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }

  await prisma.contact.update({
    where: { id },
    data: {
      status: status as "PENDING" | "REVIEWED" | "RESPONDED",
    },
  });

  return redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}updated=1`, 303);
};
