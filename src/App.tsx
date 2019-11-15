import React, { useState, useEffect } from "react";

import { fetchData } from "./api";
import { PAIRS, Market } from "./api/kraken";

import { DataGrid, BidsOrAsks } from "./components";

import "./css/tailwind.css";

const App = () => {
  const [data, setData] = useState<Market | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchData(PAIRS.ETHUSD, "development"));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (data === undefined) {
    return <p>Loading data...</p>;
  }

  const marketKey = Object.keys(data)[0];
  const market = data[marketKey];

  return (
    <div className={"text-gray-200"}>
      <div className="flex mb-1">
        <div className="w-full bg-gray-800 h-12 p-2">
          <p>
            Order Book{" "}
            {PAIRS.ETHUSD.substr(0, 3) + "/" + PAIRS.ETHUSD.substr(3)}
          </p>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 bg-gray-900 p-2">
          <DataGrid market={market} bidsOrAsks={BidsOrAsks.BIDS} />
        </div>
        <div className="w-1/2 bg-gray-800 p-2">
          <DataGrid market={market} bidsOrAsks={BidsOrAsks.ASKS} />
        </div>
      </div>
    </div>
  );
};

export default App;
