
import data from '../data.json';
import { filterData } from '../utils';

export const WorkOutsClient = {
  getWorkouts(filterParams) {
    // make an http call here to retrieve data from api.
    const filteredData = filterParams ? filterData(data, filterParams) : data;
    return new Promise((resolve, reject) => {
      resolve({ success: true, data: filteredData, totalCount: data.length });
    });
  },
};
