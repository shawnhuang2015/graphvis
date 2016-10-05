///<reference path='../../typings/index.d.ts' />
///<reference path='../../zoomcharts/zoomcharts.d.ts' />

import d3 = require('d3');
import * as _ from 'lodash';
import { AnotherNamespace } from './graph/vis.graph';

import ClassOne = AnotherNamespace.ClassOne;

let __instance = 0;

export class Main {
  private _classOne: ClassOne;
  private _instanceIndex: number;

  constructor() {
    this._classOne = new ClassOne();
    this._instanceIndex = __instance++;
  }

  test(): void {
    console.log(d3.range(10));
    let array: number[] = [1];
    let other: any[] = _.concat<any>(<any>1, array, <any>2, [3], [[4, 4, 2, 5, 6]]);

    console.log(other);
  }

  index(): this {
    console.log(this._instanceIndex);

    return this;
  }
}
