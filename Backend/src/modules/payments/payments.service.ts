import Stripe from "stripe";
import prisma from "../../prismaClient";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_PLACEHOLDER",
  {
    apiVersion: "2024-12-18.acacia" as any,
  }
);

export async function createStripeSession(userId: string, plan: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "ZAR",
          product_data: { name: `${plan} Plan` },
          unit_amount: plan === "BASIC" ? 5000 : 10000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  return session;
}

export async function handleSubscription(
  userId: string,
  plan: string,
  durationMonths: number
) {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationMonths);

  return prisma.subscription.create({
    data: { userId, plan, startDate, endDate, active: true },
  });
}
