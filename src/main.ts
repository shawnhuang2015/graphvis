import { mylib } from './lib/lib';
import {lib2Test} from './lib/lib2';


export function hello(compiler: string) {
  console.log(`Hello from ${compiler}`);
}
hello('Xiaoke Huang');
mylib('Graph SQL');
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
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

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

// let xiaoke = new Person("Xiaoke");
// console.log(xiaoke.name);
let howard = new Employee("Xiaoke", "Redwood City");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // error

