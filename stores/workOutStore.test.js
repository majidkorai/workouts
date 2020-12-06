import workOutStore from "./workOutsStore";

describe("WorkOuts Store tests", () => {
  it("fetching workouts", () => {
    const store = new workOutStore()
    const params = { page: 1, limit: 20, category: 'c1' };
    return store.fetch(params, () => { }).then(() => {
      expect(store.workOutsList.length).toBe(20);
      expect(store.workOutsList[0].name).toBe("Melodie")
      expect(store.workOutsList[0].description).toBe("Nunc pulvinar arcu et pede. Nunc");
      expect(store.workOutsList[1].name).toBe("Melvin")
      expect(store.workOutsList[1].startDate).toBe("03/13/2021")
      expect(store.workOutsCount).toBe(100);
    });
  });
  it("testing filters", () => {
    const store = new workOutStore()
    store.setFilter({ category: "c2" });
    expect(store.filtersState.category).toBe("c2");
    store.setFilter({ date: "05-2020" });
    expect(store.filtersState.date).toBe("05-2020");
    store.setFilter({ limit: 20, page: 5 });
    expect(store.hasMorePages).toBeFalsy();
  });
});