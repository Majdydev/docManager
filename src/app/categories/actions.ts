import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString().trim();
  if (!name) throw new Error("Name is required");

  await prisma.category.create({ data: { name } });
  revalidatePath("/categories");
}

export async function deleteCategory(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("id is required");
  const idNum = parseInt(id, 10);
  await prisma.category.delete({ where: { id: idNum } });
  revalidatePath("/categories");
}
