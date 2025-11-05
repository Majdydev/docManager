import React from "react";

type Category = {
  id: number;
  name: string;
  createdAt: string | Date;
};

interface Props {
  categories: Category[];
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function CategoryTable({ categories, deleteAction }: Props) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-left">
          <th className="py-2">Name</th>
          <th className="py-2">Created</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.id} className="border-t">
            <td className="py-2">{c.name}</td>
            <td className="py-2">{new Date(c.createdAt).toLocaleString()}</td>
            <td className="py-2">
              <form
                action={async (formData: FormData) =>
                  await deleteAction(formData)
                }
              >
                <input type="hidden" name="id" value={c.id} />
                <button className="text-sm text-red-600">Delete</button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
