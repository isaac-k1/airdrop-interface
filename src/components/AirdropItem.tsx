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
    <li className="flex gap-1 items-center">
      <label htmlFor={id} className="text-slate-300">
        {chain}
      </label>
      <label htmlFor={id} className="text-slate-300">
        {protocol}
      </label>
      <label htmlFor={id} className="text-slate-300">
        {confirmed}
      </label>
      <label htmlFor={id} className="text-slate-300">
        {expectedTgeDate.toString()}
      </label>
    </li>
  );
}
