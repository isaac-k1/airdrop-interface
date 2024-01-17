"use client";

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
  return (
    <tr className="border-t border-slate-600">
      <td className="px-4 py-2">{chain}</td>
      <td className="px-4 py-2">{protocol}</td>
      <td className="px-4 py-2">{confirmed ? "Yes" : "No"}</td>
      <td className="px-4 py-2">{expectedTgeDate.toLocaleDateString()}</td>
    </tr>
  );
}
