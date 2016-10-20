///<reference path='../typings/index.d.ts' />
///<reference path='../local_modules/zoomcharts/zoomcharts.d.ts' />

'use strict';

import d3 = require('d3');
import * as _ from 'lodash';
import * as ZoomCharts from '../local_modules/zoomcharts/zoomcharts';
import paths = require('./gvis.utils');

let homePath = paths.getPath(1, 'home');

console.log(homePath);
console.log('Kick off gvis 0.2.0!');

let __instance = 0;

export class GVIS {

  private instanceIndex: number;
  private version: string = '0.2.0';
  private graph: string = 'gvis graph class object';
  private style: string = 'gvis style class object, it was called gvis.behavior.js';

  layout: string = 'gvis layout class for more customized layouts.';

  constructor(options: Object) {
    this.instanceIndex = __instance++;
  }

  index(): number {
    console.log(this.instanceIndex);
    return this.instanceIndex;
  }
}

export function render() {
  return ZoomCharts;
}

export function help() {
  return d3;
}

export function utils() {
  return _;
}
