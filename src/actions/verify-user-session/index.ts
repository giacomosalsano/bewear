import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const verifyUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return null;
  }

  return session.user;
};
