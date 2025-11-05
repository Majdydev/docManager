import { prisma } from "../lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  let totalFiles = 0;
  let totalCategories = 0;
  type RendezvousRow = {
    id: number;
    notes?: string | null;
    date: string | Date;
  };
  let upcoming: Array<RendezvousRow> = [];
  let dbError: unknown = null;

  try {
    totalFiles = await prisma.file.count();
    totalCategories = await prisma.category.count();
    upcoming = await prisma.rendezvous.findMany({
      take: 5,
      orderBy: { date: "asc" },
    });
  } catch (err) {
    dbError = err;
  }

  if (dbError) {
    return (
      <div className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-medium">Database error</h2>
        <p className="text-sm text-gray-700">
          There was an error connecting to the database or querying data.
        </p>
        <pre className="text-xs text-red-600 truncate">
          {String((dbError as Error)?.message ?? String(dbError))}
        </pre>
        <div className="mt-3 text-sm text-gray-600">
          Try running the migrations and generating the Prisma client:
          <div className="mt-2">
            <code className="block bg-gray-100 p-2 rounded">
              npx prisma generate
            </code>
            <code className="block bg-gray-100 p-2 rounded mt-1">
              npx prisma migrate dev --name init
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total files</h3>
          <div className="text-2xl font-semibold">{totalFiles}</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Categories</h3>
          <div className="text-2xl font-semibold">{totalCategories}</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Upcoming rendezvous</h3>
          <div className="text-2xl font-semibold">{upcoming.length}</div>
        </div>
      </div>

      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-medium mb-2">Upcoming appointments</h2>
        <ul className="divide-y">
          {upcoming.map((r) => (
            <li key={r.id} className="py-2">
              <div className="text-sm font-semibold">
                {r.notes ?? "Appointment"}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(r.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/rendezvous" className="text-sm text-primary-600">
            View all
          </Link>
        </div>
      </section>
    </div>
  );
}
