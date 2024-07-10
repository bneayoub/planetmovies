import { clerkMiddleware } from "@clerk/nextjs/server";

const publicPaths = ["/", "/api(.*)"];

export default clerkMiddleware((auth, req, evt) => {
  const url = new URL(req.url);
  if (publicPaths.some(path => url.pathname.match(new RegExp(`^${path}$`)))) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};