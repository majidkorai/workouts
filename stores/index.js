
import WorkOutsStore from './workOutsStore';

export default class {
  constructor(initialData = { workOutsStore: {} }) {
    this.workOutsStore = new WorkOutsStore(initialData.workOutsStore)
  }
} 