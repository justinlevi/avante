import { fetchData, PAIRS } from "./kraken";

// import { default as expected } from "./ethusd.json";

describe("API Tests", () => {
  // scenarios and expectation

  it("When NODE_ENV is set to develop, it should return static data json", async () => {
    // Arrange

    // Act
    const data = await fetchData(PAIRS.ETHUSD, "development");

    // Assert Sort
    expect(data["XETHZUSD"].asks[0].price).toBeLessThan(
      data["XETHZUSD"].asks[data["XETHZUSD"].asks.length - 1].price
    );
  });
});
