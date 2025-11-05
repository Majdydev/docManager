import { prisma } from "../../lib/prisma";
import CategoryForm from "../../components/forms/CategoryForm";
import CategoryTable from "../../components/tables/CategoryTable";
import { createCategory, deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Add Category</h3>

            <CategoryForm action={createCategory} />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">All categories</h3>
            <CategoryTable
              categories={categories}
              deleteAction={deleteCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
