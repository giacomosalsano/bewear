import "server-only" // serve para deixar explicito que eu só posso importar esse arquivo dentro de um server-component

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

// Criar uma interface para Product e Variant e implementar no getProductsProps
// interface GetProductsResponse 
//   id: string;
//   categoryId: string;
//   name: string;
//   slug: string;
//   description: string;
//   createdAt: string | Date;
//   variants: {
//     id: string;
//     productId: string;
//     name: string;
//     slug: string;
//     color: string;
//     priceInCents: number;
//     imageUrl: string;
//     createdAt: string | Date;
//   }[];
// }

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  return products;
}

export const getNewlyCreatedProducts = async () => {
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  return newlyCreatedProducts;
}