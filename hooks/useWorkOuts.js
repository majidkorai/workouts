import { useState, useEffect } from 'react';
import { autorun, toJS } from 'mobx';
import { useRouter } from 'next/router';
import _isEqual from 'lodash/isEqual';
import _isEqualWith from 'lodash/isEqualWith'
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import _find from 'lodash/find';
import _isUndefined from 'lodash/isUndefined';
import { parse as parseUrl } from 'url';
import { generateQueryParamsFromState, pushQueryWithoutRefresh } from '../utils';



/**
 * fetch workouts
 *
 */
const fetchWorkOuts = (store) => {
  const params = { ..._omitBy(toJS(store.filtersState), _isUndefined) };
  store.fetch(params, (err) => {
    console.log('ERROR_FETCHING_WORKOUTS', err);
  });
}

export function useWorkOuts(store) {
  useEffect(() => {
    fetchWorkOuts(store);
  }, [store.urlQueryParams]);
}


/**
 * get props for workouts
 *
 */
export function useWorkOutsProps(store) {
  const [state, setState] = useState({
    workOutsList: [],
    isLoading: true,
    isLoaded: false,
    filtersState: {}
  });
  useEffect(() => {
    autorun(() => {
      setState({
        isLoading: store.isLoading,
        isLoaded: store.isLoaded,
        workOutsList: store.workOutsList,
        filtersState: store.filtersState,
        setFilter: store.setFilter,
        initializeFiltersState: store.initializeFiltersState
      });
    });
  }, []);
  return { ...state };
}

/**
 * get props for filters
 *
 */
export function useFilterProps(store) {
  const [state, setState] = useState({
    filtersState: {}
  });
  useEffect(() => {
    autorun(() => {
      setState({
        filtersState: store.filtersState,
        setFilter: store.setFilter,
      });
    });
  }, []);
  return { ...state };
}

/**
 * get single Item
 *
 */
export function useWorkOutItemProps(id, store) {
  const [state, setState] = useState({
    workOutItem: {}
  });
  useEffect(() => {
    autorun(() => {
      const item = _find(store.workOutsList, (item) => {
        return item.id === id;
      });
      setState({
        workOutItem: item
      });
    });
  }, [id]);
  return { ...state };
}

/**
 * update url on filters state change
 *
 */
export function useUrlUpdate(store) {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const stateParams = [toJS(store.filtersState)];
    const newQuery = { ...generateQueryParamsFromState(...stateParams) };
    if (!_isEqual(_omit(query, ['view']), newQuery)) {
      pushQueryWithoutRefresh(router, _omit(newQuery, ['view']));
    }
  }, [store.urlQueryParams]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const stateParams = [toJS(store.filtersState)];
      const stateQuery = { ...generateQueryParamsFromState(...stateParams) };
      const urlQuery = parseUrl(url, true).query;
      if (!_isEqualWith(urlQuery, stateQuery, (newVal, oldVal, key) => (key ? newVal == oldVal : undefined))) {
        if (store.initializePageState) store.initializePageState(urlQuery);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
}

