import { fetchData, PAIRS } from "./kraken";

import { default as expected } from "./static.json";

describe("API Tests", () => {
  // scenarios and expectation

  it("When NODE_ENV is set to develop, it should return static data json", async () => {
    // Arrange

    // Act
    const data = await fetchData(PAIRS.ETHUSD, "development");

    // Assert
    expect(data).toMatchObject(expected.result);
  });
});
