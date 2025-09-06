"use client";

import { Home, LogOutIcon, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";

import { CategoryMenuSection } from "@/components/common/header/components/category-menu-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { categoryTable } from "@/db/schema";

interface LoggedMenuProps {
  user: {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };
  categories: (typeof categoryTable.$inferSelect)[];
  handleSignOut: () => void;
}

export const LoggedMenu = ({
  user,
  categories,
  handleSignOut,
}: LoggedMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center justify-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={user?.image as string | undefined} />
            <AvatarFallback>
              {user?.name?.split(" ")?.[0]?.[0]}
              {user?.name?.split(" ")?.[1]?.[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">{user?.name}</h3>
            <span className="text-muted-foreground block text-xs">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6 p-5">
        <Separator />

        <div className="flex flex-col gap-4">
          <div className="hover:text-primary flex cursor-pointer items-center gap-3 font-semibold transition-colors">
            <Home size={16} />
            <Link href="/">Início</Link>
          </div>

          <div className="hover:text-primary flex cursor-pointer items-center gap-3 font-semibold transition-colors">
            <Truck size={16} />
            <Link href="/my-orders">Meus Pedidos</Link>
          </div>

          <div className="hover:text-primary flex cursor-pointer items-center gap-3 font-semibold transition-colors">
            <ShoppingCart size={16} />
            <Link href="/cart">Meu Carrinho</Link>
          </div>
        </div>

        <Separator />

        <CategoryMenuSection categories={categories} />

        <Separator />

        <Link
          href="/"
          className="hover:text-accent-foreground text-muted-foreground w-fit rounded-full font-semibold transition-colors"
          onClick={() => {
            handleSignOut();
          }}
        >
          <span className="flex items-center gap-2">
            <LogOutIcon size={16} />
            Sair
          </span>
        </Link>
      </div>
    </div>
  );
};
