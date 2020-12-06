import _get from 'lodash/get';

export default function workOutsFactory(data) {
  return _get(data, 'data', []);
}
