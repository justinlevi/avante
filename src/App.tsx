import React, { useState, useEffect } from "react";

import { fetchData } from "./api";
import { PAIRS, Market } from "./api/kraken";

import { DataGrid, BidsOrAsks } from "./components";

import "./css/tailwind.css";

type SetDataAlias = React.Dispatch<React.SetStateAction<Market | undefined>>;
const grabData = async (setData: SetDataAlias, pair: string) =>
  setData(await fetchData(pair, "development"));

const App = () => {
  const [data, setData] = useState<Market | undefined>(undefined);
  const [selectValue, setSelectValue] = useState<string>("ETHUSD");

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

  return (
    <div className={"text-gray-200"}>
      <div className="flex mb-1">
        <div className="w-full bg-gray-800 h-12 p-2">
          <p>{`Order Book ${selectValue.substr(0, 3)}/${selectValue.substr(
            3
          )}`}</p>
          <select onChange={handleChange} defaultValue={selectValue}>
            {Object.keys(PAIRS).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
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
