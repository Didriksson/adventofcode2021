import { SolutionUtils } from "../../utils/SolutionUtils";
var bench = require('nanobench')
const path = require('path');

type ResultAcc = {
    previous: number | undefined,
    numberOfIncreases: number
}

export const solveA = (input: String): any => {        
    const pInput: number[] = SolutionUtils.parseInputToNumbers(input)
    const result = countIncreases(pInput);
    return result.numberOfIncreases;
}

export const solveB = (input: String): any => {        
    const pInput: number[] = SolutionUtils.parseInputToNumbers(input)
    const chunkSum = []
    for (let index = 0; index < pInput.length; index++) {
        const element = pInput[index];
        const element2 = pInput[index+1];
        const element3 = pInput[index+2];
        chunkSum.push(element + element2 + element3);
    }    
    
    return countIncreases(chunkSum).numberOfIncreases;
}

// istanbul ignore next
if (require.main === module) {    
    bench('Solving day 1', function (b: { start: () => void; end: () => void; }) { 
        const input = SolutionUtils.readFile(path.join(__dirname, "day_1.input"));
        b.start()
        const resultA = solveA(input);
        console.log(`Result A: ${resultA}`);
        b.end();

        b.start()
        const resultB = solveB(input);
        console.log(`Result B: ${resultB}`);
        b.end();
    });
}

function checkIfIncrease(acc: ResultAcc, current: number): ResultAcc{
        if (!acc.previous)
        return { previous: current, numberOfIncreases: acc.numberOfIncreases };
    else if (acc.previous > current)
        return { previous: current, numberOfIncreases: acc.numberOfIncreases };
    else if (acc.previous < current)
        return { previous: current, numberOfIncreases: ++acc.numberOfIncreases };
    else
        return { previous: current, numberOfIncreases: acc.numberOfIncreases };
}

function countIncreases(pInput: number[]): ResultAcc {
    return pInput.reduce((acc: ResultAcc, current: number) => {
        return checkIfIncrease(acc, current)
    }, { previous: undefined, numberOfIncreases: 0 });
}
