import { makeObservable, observable, computed, action, flow, toJS } from 'mobx';
import { API_STATE } from '../constants';
import { mapInitialStateToStoreState, initializeFiltersState, constructFilterParams, generateFilterStateFromUrlQuery } from '../utils';
import { WorkOutsClient } from '../clients';
import workOutsFactory from '../factories/workOutsFactory';

/**
 * Workouts Store
 */
export default class WorkOutsStore {
  /**
   * constructor
   * @param {Object} initialState
   */
  constructor(initialState = {}) {
    makeObservable(this);
    this.updateInitialState(initialState);
  }

  @observable data = {};

  @observable API_STATE = API_STATE.INITIAL;

  @observable filtersState = initializeFiltersState();

  @computed get urlQueryParams() {
    return `${constructFilterParams(this.filtersState)}`;
  }

  /**
   * is loading
   * @return {boolean}
   */
  @computed get isLoading() {
    return this.API_STATE === API_STATE.LOADING;
  }

  /**
   * is loaded
   * @return {boolean}
   */
  @computed get isLoaded() {
    return this.API_STATE === API_STATE.SUCCESS;
  }

  /**
   * has error
   * @return {boolean}
   */
  @computed get hasError() {
    return this.API_STATE === API_STATE.FAILED;
  }

  /**
   * workOuts list
   * @return {object}
   */
  @computed get workOutsList() {
    return workOutsFactory(this.data);
  }

  /**
  * workOuts count
  * @return {object}
  */
  @computed get workOutsCount() {
    return this.data.totalCount;
  }

  @computed get hasMorePages() {
    return ((this.filtersState.page) * this.filtersState.limit) < this.workOutsCount;
  }


  /**
   * update initial state
   * @param {Object} initialState
   */
  @action updateInitialState = (initialState) => {
    mapInitialStateToStoreState(this, initialState);
  }

  /**
   * fetch workouts
   * @param {Function} errorHandler
   */
  fetch = flow(function* (filterParams, errorHandler = () => { }) {
    this.API_STATE = API_STATE.LOADING;
    try {
      const response = yield WorkOutsClient.getWorkouts(filterParams);
      this.onSuccess(response);
    } catch (error) {
      this.onError(error, errorHandler);
    }
  });

  /**
   * handle success
   * @param {Object} data
   */
  @action onSuccess = (data) => {
    this.data = data;
    this.API_STATE = API_STATE.SUCCESS;
  }

  /**
   * handle error
   * @param {Object} error
   * @param {Function} errorHandler
   */
  @action onError = (error, errorHandler) => {
    errorHandler(error);
    this.API_STATE = API_STATE.FAILED;
  }

  /**
  * set filter value
  */
  @action setFilter = (updatedFilterState = {}) => {
    this.filtersState = { ...toJS(this.filtersState), ...updatedFilterState };
  }

  /**
   * initialize filters state
   */
  @action initializeFiltersState = (filterState = {}) => {
    this.filtersState = initializeFiltersState(filterState);
  }

  /**
  * initialize page state
  */
  @action initializePageState = (query = {}) => {
    this.initializeFiltersState(generateFilterStateFromUrlQuery({ ...query }));
  }
}
