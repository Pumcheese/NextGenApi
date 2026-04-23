import type { APIRoute } from "astro";
import { prisma } from "../../lib/db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
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