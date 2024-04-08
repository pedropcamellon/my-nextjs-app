export { default } from "next-auth/middleware";

export const config = {
  // "/api/:path*",
  matcher: ["/users/:path*", "/rooms/:path*"],
};
