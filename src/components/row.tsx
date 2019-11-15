import React from "react";
import { BidsOrAsks } from ".";

type PropsType = {
  volume: number;
  total: number;
  price: number;
  bidsOrAsks: string;
};

export const Row = ({ volume, total, price, bidsOrAsks }: PropsType) => {
  return bidsOrAsks === BidsOrAsks.BIDS ? (
    <tr>
      <td className="px-4">{volume.toFixed(2)}</td>
      <td className="px-4">{total.toFixed(2)}</td>
      <td className="px-4">{price.toFixed(2)}</td>
    </tr>
  ) : (
    <tr>
      <td className="px-4">{price.toFixed(2)}</td>
      <td className="px-4">{total.toFixed(2)}</td>
      <td className="px-4">{volume.toFixed(2)}</td>
    </tr>
  );
};

export default Row;
