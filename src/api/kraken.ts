import axios from "axios";

import { default as data } from "./static.json";

export const PAIRS = {
  ETHUSD: "ETHUSD",
  XBTUSD: "XBTUSD"
};

interface KrakenResult {
  error: any[];
  result: InitialMarket;
}

type InitialMarket = {
  [x: string]: InitialAsksBids;
};

interface InitialAsksBids {
  asks: (string | number)[][];
  bids: (string | number)[][];
}

export interface AsksBids {
  asks: AskBidEntry[];
  bids: AskBidEntry[];
}

export type Market = {
  [x: string]: AsksBids;
};

type AskBidEntry = {
  count: number;
  amount: number;
  total: number;
  price: number;
};

// type AsksBidsTransformFnType = (
//   [a0, a1, a2]: (string | number)[],
//   index: number,
//   arr: (string | number)[][]
// ) => AskBidEntry;

const sortFn = (asc: boolean = true) => (
  [a0]: (string | number)[],
  [b0]: (string | number)[]
) =>
  asc
    ? parseFloat(a0 as string) - parseFloat(b0 as string)
    : parseFloat(b0 as string) - parseFloat(a0 as string);

const sortByPrice = async (orderBook: InitialMarket) => {
  const pairsKey = Object.keys(orderBook)[0];
  const { asks: mAsks, bids: mBids } = orderBook[pairsKey];
  const asks = await mAsks.sort(sortFn(true));
  const bids = await mBids.sort(sortFn(false));
  return { [pairsKey]: { asks, bids } };
};

/*
function transformFn(entry: (string | number)[], index: number) {
  const [price, volume, timestamp] = entry as [string, string, number];
  const { total: prevTotal } = this;

  return {
    count: parseFloat(volume),
    amount: parseFloat(price),
    total: parseFloat(price) + prevTotal, // cumulative volume
    price: parseFloat(price)
  };
}
*/

// Grr... really wanted to do this using a functional approach
const transform = (entries: (string | number)[][]) => {
  const newEntries: AskBidEntry[] = [];
  for (let i = 0; i < entries.length; i++) {
    const prevTotal = i > 0 ? newEntries[i - 1].total : 0;
    const [price, volume] = entries[i] as [string, string, number];
    newEntries.push({
      count: parseFloat(volume),
      amount: parseFloat(price),
      total: parseFloat(price) + prevTotal, // cumulative volume
      price: parseFloat(price)
    });
  }
  return newEntries;
};

const transformEntryToKeyedObject = async (orderBook: InitialMarket) => {
  const pairsKey = Object.keys(orderBook)[0];
  const { asks: mAsks, bids: mBids } = orderBook[pairsKey];

  const asks = transform(mAsks);

  // const thisVal: AskBidEntry = { count: 0, amount: 0, total: 0, price: 0 };
  // const bids = await mBids.map(transformFn, thisVal);
  const bids = transform(mBids);
  return { [pairsKey]: { asks, bids } };
};

const localFetch: () => Promise<Market> = async () => {
  const sorted = await sortByPrice(data.result);
  const transformed = transformEntryToKeyedObject(sorted);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(transformed);
    }, 1500);
  });
};

const remoteFetch = async (market: string) => {
  const data = (await axios.get(`/0/public/Depth?pair=${market}`, {
    headers: { "content-type": "application/json" }
  })) as KrakenResult;
  const sorted = await sortByPrice(data.result);
  const transformed = transformEntryToKeyedObject(sorted);
  return transformed;
};

export const fetchData = async (
  market: string,
  env: string = process.env.NODE_ENV
) =>
  env === "development" || env === "test" ? localFetch() : remoteFetch(market);

export default fetchData;
