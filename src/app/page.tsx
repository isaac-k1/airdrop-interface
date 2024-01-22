"use client";

import { getAllAirdrops } from "../../lib/apiClient";
import { AirdropItem } from "@/components/AirdropItem";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Airdrop {
  id: string;
  chain: string;
  protocol: string;
  confirmed: boolean;
  expectedTgeDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleDeleteAirdrop = (id: string) => {
    setAirdrops((currentAirdrops) =>
      currentAirdrops.filter((airdrop) => airdrop.id !== id)
    );
  };

  const sortAirdrops = () => {
    const sortedAirdrops = [...airdrops].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.chain.localeCompare(b.chain);
      } else {
        return b.chain.localeCompare(a.chain);
      }
    });

    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setAirdrops(sortedAirdrops);
  };

  useEffect(() => {
    const fetchAirdrops = async () => {
      const airdrops = await getAllAirdrops();
      setAirdrops(airdrops);
    };
    fetchAirdrops();
  }, []);

  return (
    <>
      <header className="flex justify-center text-center mb-4 mt-10">
        <h1 className="text-slate-100 text-3xl font-mono pr-4">
          Airdrop Interface
        </h1>
        <Link
          className="border border-slate-100 text-slate-100 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/addAirdrop"
        >
          New
        </Link>
      </header>
      <div className="flex justify-center">
        <table className="table-auto text-slate-100">
          <thead>
            <tr>
              <th className="cursor-pointer px-4 py-2" onClick={sortAirdrops}>
                Chain
                <span className="ml-2">
                  {sortDirection === "asc" ? "▼" : "▲"}
                </span>
              </th>
              <th className="px-4 py-2">Protocol</th>
              <th className="px-4 py-2">Confirmed</th>
              <th className="px-4 py-2">Expected TGE Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {airdrops.map((airdrop) => (
              <AirdropItem
                key={airdrop.id}
                {...airdrop}
                onDelete={handleDeleteAirdrop}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
