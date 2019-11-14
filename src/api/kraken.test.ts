import { fetchData } from "./kraken";

describe("API Tests", () => {
  // scenarios and expectation

  it("When NODE_ENV is set to develop, it should return static data json", async () => {
    // Arrange

    // Act
    const data = await fetchData("development");

    // Assert
    const expected = {
      static: true
    };
    expect(data).toMatchObject(expected);
  });
});
