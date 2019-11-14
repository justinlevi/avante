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

export const fetchData = async () => {
  return process.env.NODE_ENV === "development"
    ? (data as ResultType)
    : (axios.get("/0/public/Depth?pair=ETHUSD", {
        headers: { "content-type": "application/json" }
      }) as Promise<ResultType>);
};

export default fetchData;
