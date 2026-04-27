import type { APIRoute } from "astro";
import { getPrisma } from "../../lib/db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
    const { nombre, email, telefono, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      return new Response(
        JSON.stringify({ error: "El email no es válido" }),
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    const nuevoContacto = await prisma.contact.create({
      data: {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        telefono: telefono?.trim() || null,
        mensaje: mensaje.trim(),
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Mensaje guardado correctamente",
        contact: nuevoContacto,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en /api/contact:", error);

    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};
