"use server";

import { eq } from "drizzle-orm";
import z from "zod";

import { removeProductFromCartSchema } from "@/actions/remove-cart-product/schema";
import { verifyUserSession } from "@/actions/verify-user-session";
import { db } from "@/db";
import { cartItemTable } from "@/db/schema";

export const removeProductFromCart = async (
  data: z.infer<typeof removeProductFromCartSchema>,
) => {
  removeProductFromCartSchema.parse(data);

  const session = await verifyUserSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.id;

  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
