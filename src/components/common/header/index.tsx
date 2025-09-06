"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Cart } from "@/components/common/cart";
import { LoggedMenu } from "@/components/common/header/components/logged-menu";
import { UnloggedMenu } from "@/components/common/header/components/unlogged-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

interface HeaderProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export const Header = ({ categories }: HeaderProps) => {
  const { data: session } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut();
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
            </SheetHeader>

            <div className="px-5">
              {session?.user ? (
                <LoggedMenu
                  user={session.user}
                  categories={categories}
                  handleSignOut={handleSignOut}
                />
              ) : (
                <UnloggedMenu categories={categories} />
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Cart />
      </div>
    </header>
  );
};
