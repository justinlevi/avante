import React from "react";

import { PAIRS } from "../api/kraken";

type Props = {
  orderBook: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Header = ({ orderBook, handleChange }: Props) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          {`Order Book ${orderBook}}`}
        </span>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <div>
          <div className="flex mb-1">
            <div className="w-full h-12 p-2">
              <select
                className="text-black"
                onChange={handleChange}
                defaultValue={PAIRS.ETHUSD}
              >
                {Object.keys(PAIRS).map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
