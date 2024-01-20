"use client";

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
      <td className="px-4 py-2">{expectedTgeDate.toLocaleDateString()}</td>
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
