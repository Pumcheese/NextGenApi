import { defineMiddleware } from "astro:middleware";
import { getSessionFromCookies } from "./lib/session";

const adminRoutePattern = /^\/(es|en)\/admin(\/|$)/;
const loginRoutePattern = /^\/(es|en)\/admin\/login\/?$/;
const adminLoginApiPath = "/api/admin/login";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const currentSession = getSessionFromCookies(context.cookies);
  const currentUser = currentSession
    ? {
        id: currentSession.userId,
        name: "",
        email: "",
        role: "admin",
      }
    : null;

  context.locals.currentUser = currentUser;

  if (pathname === "/") {
    return context.redirect("/es/");
  }

  if (pathname.startsWith("/api/admin") && pathname !== adminLoginApiPath && !currentUser) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  if (adminRoutePattern.test(pathname) && !loginRoutePattern.test(pathname) && !currentUser) {
    const lang = pathname.split("/")[1] || "es";
    return context.redirect(`/${lang}/admin/login`);
  }

  if (loginRoutePattern.test(pathname) && currentUser) {
    const lang = pathname.split("/")[1] || "es";
    return context.redirect(`/${lang}/admin`);
  }

  const response = await next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (pathname.startsWith("/api/admin") || adminRoutePattern.test(pathname)) {
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
});
