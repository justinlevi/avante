import React from "react";
import { fetchData } from "./api";

import "./css/tailwind.css";

const init = async () => {
  const data = await fetchData();
  console.log(data);
};

const App = () => {
  init();
  return (
    <div className="flex mb-4">
      <div className="w-1/3 bg-gray-400 h-12">column 1</div>
      <div className="w-1/3 bg-gray-500 h-12">column 2</div>
      <div className="w-1/3 bg-gray-600 h-12">column 3</div>
    </div>
  );
};

export default App;
