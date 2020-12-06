
import _flatMap from 'lodash/flatMap';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _slice from 'lodash/slice';
import { format as formatUrl, parse as parseUrl } from 'url';


export function mapInitialStateToStoreState(store, initialState = {}) {
  Object.keys(initialState).forEach((key) => {
    store[key] = initialState[key];
  });
}



export function initializeFiltersState(filterState = {}) {
  return {
    'limit': parseInt(filterState['limit']) || 20,
    'page': parseInt(filterState['page']) || 1,
    'date': filterState['date'],
    'category': filterState['category']
  };
}

export function pushQueryWithoutRefresh(Router, query) {
  Router.push(
    formatUrl({ pathname: Router.pathname, query }),
    formatUrl({
      pathname: parseUrl(Router.asPath).pathname,
      query,
    }),
    { shallow: true },
  );
}


export function constructFilterParams(filtersState) {
  return _flatMap(
    _omitBy(filtersState, _isUndefined),
    (val, key) => (Array.isArray(val) ? _map(val, (index, value) => `${key}=${value}`) : `${key}=${val}`),
  ).join('&');
}

export function generateQueryParamsFromState(filterState) {
  const queryParams = {};
  _map(_omitBy(filterState, _isUndefined), (filterValue, filterName) => {
    if (_isArray(filterValue))
      queryParams[filterName] = filterValue.join(',');
    else queryParams[filterName] = filterValue;
  });
  return queryParams;
}

export function generateFilterStateFromUrlQuery(query) {
  const filterState = {};
  _map(_omitBy(query, _isEmpty), (filterValue, filterName) => {
    if (filterValue.includes(',')) filterState[filterName] = _split(filterValue, ',').map((item) => item);
    else filterState[filterName] = filterValue;
  });
  return filterState;
}

export function filterData(data, params) {
  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  let filtered = data;
  if (params.date) {
    filtered = filterByDate(data, params.date);
  }
  if (params.category) {
    filtered = filterByCategory(filtered, params.category);
  }
  return _slice(filtered, start, end);
}

function filterByCategory(data, category) {
  return data.filter(item => item.category === category);
}

function filterByDate(data, date) {
  const month = date.split('-')[0];
  const year = date.split('-')[1];
  return data.filter(item => {
    const itemMonth = item.startDate.split('/')[0];
    const itemYear = item.startDate.split('/')[2];
    return itemMonth == month && itemYear == year;
  })
}