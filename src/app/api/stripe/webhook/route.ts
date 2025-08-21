import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature"); //verifica se o webhook foi enviado pelo stripe
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") { //se o evento for um checkout.session.completed, atualiza o status do pedido para pago
    console.log("Checkout session completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return NextResponse.error();
    }
    await db
      .update(orderTable) //atualiza o status do pedido para pago
      .set({
        status: "paid",
      })
      .where(eq(orderTable.id, orderId));
  }
  return NextResponse.json({ received: true }); //retorna uma resposta para o stripe, informando que foi recebido para que o Sripe nao fique retentando a requisição
};