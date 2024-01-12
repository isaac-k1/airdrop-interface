import prisma from "../../../lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function addAirdrop(data: FormData) {
  "use server";

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

  await prisma.airdrop.create({
    data: {
      chain,
      protocol,
      confirmed,
      expectedTgeDate: new Date(expectedTgeDate),
    },
  });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-center text-center mb-10 mt-10">
        <h1 className="text-3xl font-mono">Add Airdrop</h1>
      </header>
      <form
        action={addAirdrop}
        className="flex flex-col items-center gap-4 p-2"
      >
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="chain" className="text-slate-300 mb-2">
            Chain
          </label>
          <input
            type="text"
            id="chain"
            name="chain"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
          />
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="protocol" className="text-slate-300 mb-2">
            Protocol
          </label>
          <input
            type="text"
            id="protocol"
            name="protocol"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
          />
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="confirmed" className="text-slate-300 mb-2">
            Confirmed
          </label>
          <select
            id="confirmed"
            name="confirmed"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="expectedTgeDate" className="text-slate-300 mb-2">
            Expected TGE Date
          </label>
          <input
            type="date"
            id="expectedTgeDate"
            name="expectedTgeDate"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus:within:border-slate-100 w-full"
          />
        </div>
        <div className="flex justify-center w-full max-w-md">
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-4 py-2 rounded hover:bg-slate-700 outline-none mr-2"
          >
            Add
          </button>
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
