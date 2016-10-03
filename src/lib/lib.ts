import {lib2Test} from './lib2';

export function mylib(compiler: string) {
    console.log(`!!! ! !!! !!!  Hello from  Mylib ${compiler}`);
}

lib2Test();

console.log('test tslint');

export function test(value: number) {
  console.log(value);
}
