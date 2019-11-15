import React from "react";
import { BidsOrAsks } from ".";

type PropsType = {
  count: number;
  amount: number;
  total: number;
  price: number;
  bidsOrAsks: string;
};

export const Row = ({ count, amount, total, price, bidsOrAsks }: PropsType) => {
  return bidsOrAsks === BidsOrAsks.BIDS ? (
    <tr>
      <td className="px-4">{count.toFixed(2)}</td>
      <td className="px-4">{amount.toFixed(2)}</td>
      <td className="px-4">{total.toFixed(2)}</td>
      <td className="px-4">{price.toFixed(2)}</td>
    </tr>
  ) : (
    <tr>
      <td className="px-4">{price.toFixed(2)}</td>
      <td className="px-4">{total.toFixed(2)}</td>
      <td className="px-4">{amount.toFixed(2)}</td>
      <td className="px-4">{count.toFixed(2)}</td>
    </tr>
  );
};

export default Row;
