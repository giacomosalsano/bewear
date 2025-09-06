import Link from "next/link";

import { categoryTable } from "@/db/schema";

interface CategoryMenuSectionProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export const CategoryMenuSection = ({
  categories,
}: CategoryMenuSectionProps) => {
  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="hover:text-primary flex cursor-pointer items-center gap-4 font-semibold transition-colors"
        >
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};
