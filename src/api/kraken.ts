import axios from "axios";

import { default as data } from "./static.json";

type ResultType = {
  error: [];
  result: {
    XETHZUSD: {
      asks: [];
      bids: [];
    };
  };
};

export const fetchData = async (env: string = process.env.NODE_ENV) => {
  return env === "development"
    ? (data as ResultType | { static: boolean })
    : (axios.get("/0/public/Depth?pair=ETHUSD", {
        headers: { "content-type": "application/json" }
      }) as Promise<ResultType>);
};

export default fetchData;
