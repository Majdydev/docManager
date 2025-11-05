"use client";

import { useState } from "react";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export default function CategoryForm({ action }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        try {
          setLoading(true);
          await action(formData);
          setName("");
        } catch (err) {
          console.error(err);
          alert((err as Error).message);
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-3"
    >
      <div>
        <label className="block text-sm text-gray-600">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="Category name"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </div>
    </form>
  );
}
