import axios from "axios";

import { default as ETHUSD } from "./ethusd.json";
import { default as XBTUSD } from "./xbtusd.json";

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
  volume: number;
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

// Grrr... really wanted to do this using a functional approach
const transform = (entries: (string | number)[][]) => {
  const newEntries: AskBidEntry[] = [];
  for (let i = 0; i < entries.length; i++) {
    const prevTotal = i > 0 ? newEntries[i - 1].total : 0;
    const [price, volume] = entries[i] as [string, string, number];
    newEntries.push({
      volume: parseFloat(volume),
      total: parseFloat(price) + prevTotal, // cumulative volume
      price: parseFloat(price)
    });
  }
  return newEntries;
};

const transformEntryToKeyedObject = async (orderBook: InitialMarket) => {
  const pairsKey = Object.keys(orderBook)[0];
  const { asks: mAsks, bids: mBids } = orderBook[pairsKey];

  // const thisVal: AskBidEntry = { count: 0, amount: 0, total: 0, price: 0 };
  // const asks = await mAsks.map(transformFn, thisVal);
  // const bids = await mBids.map(transformFn, thisVal);
  const asks = transform(mAsks);
  const bids = transform(mBids);
  return { [pairsKey]: { asks, bids } };
};

const localFetch: (pair: string) => Promise<Market> = async (pair: string) => {
  const data: KrakenResult = pair === PAIRS.XBTUSD ? XBTUSD : ETHUSD;
  const sorted = await sortByPrice(data.result);
  const transformed = transformEntryToKeyedObject(sorted);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(transformed);
    }, 500);
  });
};

const remoteFetch = async (pair: string) => {
  const { data } = await axios.get(`/0/public/Depth?pair=${pair}`, {
    headers: { "content-type": "application/json" }
  });
  const sorted = await sortByPrice(data.result);
  const transformed = transformEntryToKeyedObject(sorted);
  return transformed;
};

export const fetchData = async (
  pair: string,
  env: string = process.env.NODE_ENV
) =>
  env === "development" || env === "test"
    ? localFetch(pair)
    : remoteFetch(pair);

export default fetchData;
