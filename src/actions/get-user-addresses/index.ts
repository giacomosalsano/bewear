"use server";

import { eq } from "drizzle-orm";

import { verifyUserSession } from "@/actions/verify-user-session";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";

export async function getUserAddresses() {
  const session = await verifyUserSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const addresses = await db
      .select()
      .from(shippingAddressTable)
      .where(eq(shippingAddressTable.userId, session.id))
      .orderBy(shippingAddressTable.createdAt);

    return addresses;
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);

    throw new Error("Erro ao buscar endereços");
  }
}
