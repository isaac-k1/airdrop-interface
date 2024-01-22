"use client";

import Link from "next/link";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { modifyAirdrop, getAirdropById } from "../../../../lib/apiClient";
import { useEffect, useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const [airdropData, setAirdropData] = useState({
    id: "",
    chain: "",
    protocol: "",
    confirmed: false,
    expectedTgeDate: "",
  });

  async function modifyAirdropData(data: FormData) {
    const chain = data.get("chain")?.valueOf();
    if (typeof chain !== "string" || chain.length === 0) {
      throw new Error("chain is required");
    }

    const protocol = data.get("protocol")?.valueOf();
    if (typeof protocol !== "string" || protocol.length === 0) {
      throw new Error("protocol is required");
    }

    const confirmedValue = data.get("confirmed");
    const confirmed = confirmedValue === "true";

    const expectedTgeDate = data.get("expectedTgeDate")?.valueOf();
    if (typeof expectedTgeDate !== "string" || expectedTgeDate.length === 0) {
      throw new Error("expectedTgeDate is required");
    }

    await modifyAirdrop(id, chain, protocol, confirmed, expectedTgeDate);

    redirect("/");
  }

  useEffect(() => {
    const fetchAirdropData = async () => {
      try {
        const data = await getAirdropById(id);
        setAirdropData({
          id: data.id,
          chain: data.chain,
          protocol: data.protocol,
          confirmed: data.confirmed,
          expectedTgeDate: new Date(data.expectedTgeDate)
            .toISOString()
            .split("T")[0],
        });
      } catch (error) {
        console.error("Failed to fetch airdrop data:", error);
      }
    };

    fetchAirdropData();
  }, []);

  return (
    <>
      <header className="flex justify-center text-center mb-10 mt-10">
        <h1 className="text-3xl font-mono text-slate-100">Modify Airdrop</h1>
      </header>
      <form
        action={modifyAirdropData}
        className="flex flex-col items-center gap-4 p-2"
      >
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="chain" className="text-slate-100 mb-2">
            Chain
          </label>
          <input
            type="text"
            id="chain"
            name="chain"
            className="border text-slate-100 border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
            value={airdropData.chain}
            onChange={(e) =>
              setAirdropData({ ...airdropData, chain: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="protocol" className="text-slate-100 mb-2">
            Protocol
          </label>
          <input
            type="text"
            id="protocol"
            name="protocol"
            className="text-slate-100 border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
            value={airdropData.protocol}
            onChange={(e) =>
              setAirdropData({ ...airdropData, protocol: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="confirmed" className="text-slate-100 mb-2">
            Confirmed
          </label>
          <select
            id="confirmed"
            name="confirmed"
            className="text-slate-100 border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="expectedTgeDate" className="text-slate-100 mb-2">
            Expected TGE Date
          </label>
          <input
            type="date"
            id="expectedTgeDate"
            name="expectedTgeDate"
            className="text-slate-100 border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
            value={airdropData.expectedTgeDate}
            onChange={(e) =>
              setAirdropData({
                ...airdropData,
                expectedTgeDate: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-center w-full max-w-md">
          <button
            type="submit"
            className="border border-slate-100 text-slate-100 px-4 py-2 rounded hover:bg-slate-700 outline-none mr-2"
          >
            Save
          </button>
          <Link
            href=".."
            className="border border-slate-100 text-slate-100 px-2 py-1 rounded hover:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
