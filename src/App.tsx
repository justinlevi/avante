import React, { useState, useEffect } from "react";

import { fetchData } from "./api";
import { PAIRS, Market } from "./api/kraken";

import { DataGrid, BidsOrAsks, Header } from "./components";

import "./css/tailwind.css";

type SetDataAlias = React.Dispatch<React.SetStateAction<Market | undefined>>;
const grabData = async (setData: SetDataAlias, pair: string) =>
  setData(await fetchData(pair));
// setData(await fetchData(pair, "development"));

const App = () => {
  const [data, setData] = useState<Market | undefined>(undefined);
  const [selectValue, setSelectValue] = useState<string>(PAIRS.ETHUSD);

  useEffect(() => {
    grabData(setData, PAIRS.ETHUSD);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    grabData(setData, event.target.value);
  };

  if (data === undefined) {
    return <p>Loading data...</p>;
  }

  const marketKey = Object.keys(data)[0];
  const market = data[marketKey];
  const orderBook = `${selectValue.substr(0, 3)}/${selectValue.substr(3)}`;

  return (
    <div className={"text-gray-200"}>
      <Header orderBook={orderBook} handleChange={handleChange} />
      <div className="flex mb-4">
        <div className="w-1/2 bg-gray-900">
          <DataGrid market={market} bidsOrAsks={BidsOrAsks.BIDS} />
        </div>
        <div className="w-1/2 bg-gray-800">
          <DataGrid market={market} bidsOrAsks={BidsOrAsks.ASKS} />
        </div>
      </div>
    </div>
  );
};

export default App;
