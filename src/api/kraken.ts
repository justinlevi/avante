import axios from "axios";

import { default as data } from "./static.json";

export const PAIRS = {
  ETHUSD: "ETHUSD",
  XBTUSD: "XBTUSD"
};

interface AsksBids {
  asks: (string | number)[][];
  bids: (string | number)[][];
}

export type Market = {
  [x: string]: AsksBids;
};

interface KrakenResult {
  error: any[];
  result: Market;
}

type sortFnType = (
  [a0, a1, a2]: (string | number)[],
  [b0, b1, b2]: (string | number)[]
) => number;

const sortFn: sortFnType = ([a0], [b0]) =>
  parseInt(a0 as string, 10) - parseInt(b0 as string, 10);

// hmmm, is there a better way to do this with generics??
const sortByPrice = (orderBook: Market) => {
  const key = Object.keys(orderBook)[0];
  return {
    [key]: {
      asks: orderBook[key].asks.sort(sortFn),
      bids: orderBook.XETHZUSD.bids
    }
  };
};

const localFetch: () => Promise<Market> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sortByPrice(data.result));
    }, 1500);
  });
};

const remoteFetch = async (market: string) => {
  const data = (await axios.get(`/0/public/Depth?pair=${market}`, {
    headers: { "content-type": "application/json" }
  })) as KrakenResult;
  return sortByPrice(data.result);
};

export const fetchData = async (
  market: string,
  env: string = process.env.NODE_ENV
) =>
  env === "development" || env === "test" ? localFetch() : remoteFetch(market);

export default fetchData;
