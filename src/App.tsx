import React, { useState, useEffect } from "react";
import { fetchData } from "./api";
import { PAIRS, Markets } from "./api/kraken";

import "./css/tailwind.css";

const App = () => {
  const [data, setData] = useState<Markets | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const data = await fetchData(PAIRS.ETHUSD);
      setData(data);
    })();
  }, []);

  if (data === undefined) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="flex mb-4">
      <div className="w-1/3 bg-gray-400 h-12">column 1</div>
      <div className="w-1/3 bg-gray-500 h-12">column 2</div>
      <div className="w-1/3 bg-gray-600 h-12">column 3</div>
    </div>
  );
};

export default App;
