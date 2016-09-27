import { mylib } from "./lib/lib"
import {lib2Test} from './lib/lib2'


export function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}
hello("TypeScript");
mylib("TypeScript");
lib2Test();