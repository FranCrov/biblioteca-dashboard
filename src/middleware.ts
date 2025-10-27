import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/libros(.*)",
  "/clientes(.*)",
  "/prestamos(.*)",
  "/devoluciones(.*)",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Si la ruta requiere autenticación y no hay usuario logueado → redirige al login
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }

  // Si todo bien, sigue normal
  return;
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"],
};
