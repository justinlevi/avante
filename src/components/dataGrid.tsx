import React from "react";

import { AsksBids } from "../api/kraken";
import { Row } from ".";

export const BidsOrAsks = {
  BIDS: "BIDS",
  ASKS: "ASKS"
};

type PropsType = {
  market: AsksBids;
  bidsOrAsks: string;
};

export const DataGrid = ({ market, bidsOrAsks }: PropsType) => {
  const dataSet = bidsOrAsks === BidsOrAsks.ASKS ? market.asks : market.bids;
  return (
    <table className="w-full table-fixed">
      <thead>
        {bidsOrAsks === BidsOrAsks.BIDS ? (
          <tr>
            <th className="w-1/4 px-4 py-2 text-left">Count</th>
            <th className="w-1/4 px-4 py-2 text-left">Amount</th>
            <th className="w-1/4 px-4 py-2 text-left">Total</th>
            <th className="w-1/4 px-4 py-2 text-left">Price</th>
          </tr>
        ) : (
          <tr>
            <th className="w-1/4 px-4 py-2 text-left">Price</th>
            <th className="w-1/4 px-4 py-2 text-left">Total</th>
            <th className="w-1/4 px-4 py-2 text-left">Amount</th>
            <th className="w-1/4 px-4 py-2 text-left">Count</th>
          </tr>
        )}
      </thead>
      <tbody>
        {dataSet.map((entry, index) => {
          return (
            <Row key={`asks${index}`} {...entry} bidsOrAsks={bidsOrAsks} />
          );
        })}
      </tbody>
    </table>
  );
};

export default { DataGrid, BidsOrAsks };
