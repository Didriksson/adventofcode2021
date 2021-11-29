import * as fs from 'fs';
const path = require('path');

export class SolutionUtils {
    static parseInput(input: String): string[] {
        throw new Error("Method not implemented.");
    }
    static parseInputToNumbers(input: String): number[] {
        return input.split("\n").map(p => +p);
    }
    
    static readFile(path: string){
        return fs.readFileSync(path,'utf8');
    }

}