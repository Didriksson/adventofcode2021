import * as fs from 'fs';
const { performance } = require('perf_hooks')


type Result = {
    partA: string
    timeA: number
    partB: string
    timeB: number
}

export abstract class Solution {
    
    abstract solveA(input: string): any;
    abstract solveB(input: string): any;

    public parseInput(input: String): string[] {
        return input.split("\n").map(i => i.trim());
    }

    public parseInputToNumbers(input: String): number[] {
        return input.split("\n").map(p => +p);
    }
    public parseRowToNumbers(input: string, delimiter: RegExp = new RegExp('\\s+')){
        return input.split(delimiter).map(x=> +x);
    }
    public readFile(path: string){
        return fs.readFileSync(path,'utf8');
    }

    public benchMark(input: string): Result{
        const t0a = performance.now();
        const result = this.solveA(input);
        const t1a = performance.now();
        console.log(`Result A: ${result}. Time: ${t1a - t0a}ms`)
        
        const t0b = performance.now();
        const resultB = this.solveB(input);
        const t1b = performance.now();
        console.log(`Result B: ${result}. Time: ${t1b - t0b}ms`)
        return {partA: result, timeA: t1a - t0a, partB: resultB, timeB: t1b - t0b};    
    }

}

