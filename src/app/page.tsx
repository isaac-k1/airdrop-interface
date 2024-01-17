import prisma from "../../lib/prisma";
import { AirdropItem } from "@/components/AirdropItem";
import Link from "next/link";

function getAirdrops() {
  return prisma.airdrop.findMany();
}

export default async function Home() {
  const airdrops = await getAirdrops();
  return (
    <>
      <header className="flex justify-center text-center mb-4 mt-10">
        <h1 className="text-3xl font-mono pr-4">Airdrop Interface</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/addAirdrop"
        >
          New
        </Link>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-slate-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Chain</th>
              <th className="px-4 py-2">Protocol</th>
              <th className="px-4 py-2">Confirmed</th>
              <th className="px-4 py-2">Expected TGE Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {airdrops.map((airdrop) => (
              <AirdropItem key={airdrop.id} {...airdrop} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
