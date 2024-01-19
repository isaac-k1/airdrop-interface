"use client";

import { deleteAirdrop } from "../../lib/apiClient";
import { useRouter } from "next/navigation";

type AirdropItemProps = {
  id: string;
  chain: string;
  protocol: string;
  confirmed: boolean;
  expectedTgeDate: Date;
};

export function AirdropItem({
  id,
  chain,
  protocol,
  confirmed,
  expectedTgeDate,
}: AirdropItemProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteAirdrop(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete the airdrop:", error);
    }
  };

  return (
    <tr className="border-t border-slate-600">
      <td className="px-4 py-2">{chain}</td>
      <td className="px-4 py-2">{protocol}</td>
      <td className="px-4 py-2">{confirmed ? "Yes" : "No"}</td>
      <td className="px-4 py-2">{expectedTgeDate.toLocaleDateString()}</td>
      <td className="px-4 py-2">
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
