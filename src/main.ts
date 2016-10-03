/// <reference path='../typings/index.d.ts' />
/// <reference path='../zoomcharts/zoomcharts.d.ts' />

import { mylib } from './lib/lib';
import {lib2Test} from './lib/lib2';

// import * as d3 from 'd3';
import d3 = require('d3');
import * as _ from 'lodash';
// import * as ZoomCharts from '../zoomcharts/zoomcharts';
import { NetChart } from '../zoomcharts/zoomcharts';

interface Parent { x; }
interface Child extends Parent { y; }

function foo(p: Child): Child;
function foo(p: Parent): Parent;
function foo(p: any): any;
function foo(p: any) { return p; }

console.log(foo('test'
  ));
console.log(d3.range(10));
let array: number[] = [1];
let other: any[] = _.concat<any>(1, array, 2, [3], [[4, 4, 2, 5, 6]]);

console.log(other);

let myTest: { (...values: number[]): number } = function() {
  let result = 0;
  for (let i = 0; i < arguments.length; ++i) {
    result += arguments[i];
  }

  return result;
};

console.log(myTest(1, 2, 3, 4, 5));


// class Test implements Window {
//   ZoomChartsLicense: string;
//   ZoomChartsLicenseKey: string;
// }

// let test1 = new Test();

let data = {
  'nodes': [
    { 'id': 'n1', 'loaded': true, 'style': { 'label': 'Node1' } },
    { 'id': 'n2', 'loaded': true, 'style': { 'label': 'Node2' } },
    { 'id': 'n3', 'loaded': true, 'style': { 'label': 'Node3' } }
  ],
  'links': [
    { 'id': 'l1', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1a', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1b', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1c', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1d', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1e', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1f', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1g', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l1h', 'from': 'n1', 'to': 'n2', 'style': { 'fillColor': 'red', 'toDecoration': 'arrow' } },
    { 'id': 'l2', 'from': 'n2', 'to': 'n3', 'style': { 'fillColor': 'green', 'toDecoration': 'arrow' } },
    { 'id': 'l3', 'from': 'n3', 'to': 'n1', 'style': { 'fillColor': 'blue', 'toDecoration': 'arrow' } }
    ]
};

let setting: Object = {
    container: document.getElementById('demo'),
    area: { height: 350 },
    data: { preloaded: data },
    assetsUrlBase: '/dist/assets'
};

new NetChart(setting);
// new ZoomCharts.NetChart(setting);



export function hello(compiler: string) {
  console.log(`Hello from ${compiler}`);
}
hello('Xiaoke Huan');
mylib('dfasd fs Graph SQL 12 123');
lib2Test();

class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move(34);

class Person {
  protected name: string;
  // public name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

// let xiaoke = new Person('Xiaoke');
// console.log(xiaoke.name);
let howard = new Employee('Xiaoke', 'Redwood City');
console.log(howard.getElevatorPitch());
// console.log(howard.name); // error


