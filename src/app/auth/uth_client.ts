import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://dashboard-portal-server-production.up.railway.app",

  plugins: [adminClient()],
});
