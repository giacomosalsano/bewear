"use client";

import { Home, LogInIcon } from "lucide-react";
import Link from "next/link";

import { CategoryMenuSection } from "@/components/common/header/components/category-menu-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categoryTable } from "@/db/schema";

interface UnloggedMenuProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export const UnloggedMenu = ({ categories }: UnloggedMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="font-semibold">Olá. Faça seu login!</h2>

        <Button asChild className="rounded-full font-semibold" size="lg">
          <Link href="/authentication">
            LogIn
            <LogInIcon />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-6 p-5">
        <Separator />

        <div className="flex flex-col gap-4">
          <div className="hover:text-primary flex cursor-pointer items-center gap-3 font-semibold transition-colors">
            <Home size={16} />
            <Link href="/">Início</Link>
          </div>
        </div>

        <Separator />

        <CategoryMenuSection categories={categories} />
      </div>
    </div>
  );
};
