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

    static benchMark(){
        bench('', function (b: { start: () => void; end: () => void; }) { 
            b.start()
            const result = solveA(input);
            console.log(`Result: ${result}`);
            b.end();
    
            b.start()
            const resultB = solveB(input);
            console.log(`Result B: ${resultB}`);
            b.end();
        });
    
    }

}

function bench(arg0: string, arg1: (b: { start: () => void; end: () => void; }) => void) {
    throw new Error('Function not implemented.');
}
