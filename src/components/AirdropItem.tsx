"use client";

import Link from "next/link";
import { deleteAirdrop } from "../../lib/apiClient";

type AirdropItemProps = {
  id: string;
  chain: string;
  protocol: string;
  confirmed: boolean;
  expectedTgeDate: Date;
  onDelete: (id: string) => void;
};

export function AirdropItem({
  id,
  chain,
  protocol,
  confirmed,
  expectedTgeDate,
  onDelete,
}: AirdropItemProps) {
  const toMMDDYYYY = (isoDateString: any) => {
    const [year, month, day] = isoDateString.split("-");
    return `${month}-${day}-${year}`;
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this airdrop item? 🤔")
    ) {
      try {
        await deleteAirdrop(id);
        onDelete(id);
      } catch (error) {
        console.error("Failed to delete airdrop item:", error);
      }
    }
  };

  return (
    <tr className="border-t border-slate-600">
      <td className="max-w-32 break-words px-4 py-2">{chain}</td>
      <td className="max-w-32 break-words px-4 py-2">{protocol}</td>
      <td className="px-4 py-2">{confirmed ? "Yes" : "No"}</td>
      <td className="px-4 py-2">
        {toMMDDYYYY(expectedTgeDate.toISOString().split("T")[0])}
      </td>
      <td className="px-2 py-2">
        <Link
          href={`/modifyAirdrop/${id}`}
          className="p-1 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Modify
        </Link>
      </td>
      <td className="px-4 py-2">
        <button
          className="p-1 bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 transition ease-in-out duration-150"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
