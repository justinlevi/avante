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
  const bids = bidsOrAsks === BidsOrAsks.BIDS;
  const dataSet = bids ? market.bids : market.asks;
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-1/4 px-4 py-2 text-left">
            {bids ? "Volume" : "Price"}
          </th>
          <th className="w-1/4 px-4 py-2 text-left">Total</th>
          <th className="w-1/4 px-4 py-2 text-left">
            {bids ? "Price" : "Volume"}
          </th>
        </tr>
      </thead>
      <tbody>
        {dataSet.map(({ total, price, volume }, index) => {
          const { v, t, p } = {
            v: volume.toFixed(2),
            t: total.toFixed(2),
            p: price.toFixed(2)
          };
          const percentage =
            100 - (total / dataSet[dataSet.length - 1].total) * 100;
          console.log(percentage);
          return (
            <Row key={`asks${index}`} percentage={percentage} bids={bids}>
              <td className="px-4">{bids ? v : p}</td>
              <td className="px-4">{t}</td>
              <td className="px-4">{bids ? p : v}</td>
            </Row>
          );
        })}
      </tbody>
    </table>
  );
};

export default { DataGrid, BidsOrAsks };
