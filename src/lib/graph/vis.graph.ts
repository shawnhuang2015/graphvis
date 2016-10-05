import { CommonComponent } from './vis.utils';

export module AnotherNamespace {
  export class ClassOne {
    private _component: CommonComponent;

    constructor() {
      this._component = new CommonComponent();
    }
  }
}

