import { initializeFiltersState, constructFilterParams, generateFilterStateFromUrlQuery, filterData } from './utils';
import data from './data.json';

describe("test utility functions", () => {
  it("initializeFiltersState function should return initial filter state", () => {
    const filterState = initializeFiltersState()
    expect(filterState.limit).toBe(20);
    expect(filterState.page).toBe(1);
    expect(filterState.date).toBe(undefined);
  });
  it("constructFilterParams function should return construct a string from params", () => {
    const filterState = initializeFiltersState()
    const filterParams = constructFilterParams(filterState);
    expect(filterParams).toBe("limit=20&page=1");
  });
  it("generateFilterStateFromUrlQuery function should construct filter state from query params", () => {
    const filterState = generateFilterStateFromUrlQuery({ limit: 20, page: 1, category: 'c2', date: '05-2021' })
    expect(filterState.limit).toBe(undefined);
    expect(filterState.page).toBe(undefined);
    expect(filterState.category).toBe('c2');
    expect(filterState.date).toBe('05-2021');
  });

  it("filterData function should filter the results based on params", () => {
    const filterState = initializeFiltersState({ limit: 20, page: 1, category: 'c2', date: '05-2021' });
    const filteredData = filterData(data, filterState);
    expect(filteredData.length).toBe(1);
  });

});