import { fetchData, PAIRS } from "./kraken";

// import { default as expected } from "./ethusd.json";

describe("API Tests", () => {
  // scenarios and expectation

  it("When NODE_ENV is set to `development`, it should return static data json with Bids sorted DESC and asks sorted ASC", async () => {
    // Arrange

    // Act
    const data = await fetchData(PAIRS.ETHUSD, "development");
    const { asks, bids } = data["XETHZUSD"];

    // Assert the returned bids/asks are arrays of objects
    expect(asks[0]).toEqual({ volume: 2, total: 187.71, price: 187.71 });
    expect(bids[0]).toEqual({ volume: 10, total: 187.6, price: 187.6 });

    // Assert bids DESC
    bids.map((entry, index, arr) => {
      if (index > 0) {
        const prevPrice = arr[index - 1].price;
        // console.log(`${prevPrice}: ${entry.price}`);
        expect(prevPrice).toBeGreaterThan(entry.price);
      }
    });

    // Assert asks ASC
    asks.map((entry, index, arr) => {
      if (index > 0) {
        const prevPrice = arr[index - 1].price;
        // console.log(`${prevPrice}: ${entry.price}`);
        expect(prevPrice).toBeLessThan(entry.price);
      }
    });
  });
});
