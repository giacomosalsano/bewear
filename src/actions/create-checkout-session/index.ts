"use server";

import { eq } from "drizzle-orm";
import Stripe from "stripe";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "@/actions/create-checkout-session/schema";
import { verifyUserSession } from "@/actions/verify-user-session";
import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set");
  }
  const session = await verifyUserSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { orderId } = createCheckoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.id) {
    throw new Error("Unauthorized");
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: { with: { product: true } },
    },
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"], // TODO: Add other payment methods like PIX, Boleto, etc.
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`, //pagina quando o pagamento for bem sucedido
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`, //pagina quando o pagamento for cancelado
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      //adiciona os itens do pedido no checkout
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product.description,
            images: [orderItem.productVariant.imageUrl],
          },
          // Em centavos
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  
  return checkoutSession;
};
