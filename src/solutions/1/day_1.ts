import { Solution } from "../../utils/Solution";

type ResultAcc = {
    previous: number | undefined,
    numberOfIncreases: number
};

export class Day1 extends Solution{

    solveA = (input: String): any => {        
        const pInput: number[] = this.parseInputToNumbers(input)
        const result = this.countIncreases(pInput);
        return result.numberOfIncreases;
    }
    
    solveB = (input: String): any => {        
        const pInput: number[] = this.parseInputToNumbers(input)
        const chunkSum = []
        for (let index = 0; index < pInput.length; index++) {
            const element = pInput[index];
            const element2 = pInput[index+1];
            const element3 = pInput[index+2];
            chunkSum.push(element + element2 + element3);
        }    
        
        return this.countIncreases(chunkSum).numberOfIncreases;
    }
    
    checkIfIncrease(acc: ResultAcc, current: number): ResultAcc{
            if (!acc.previous)
            return { previous: current, numberOfIncreases: acc.numberOfIncreases };
        else if (acc.previous > current)
            return { previous: current, numberOfIncreases: acc.numberOfIncreases };
        else if (acc.previous < current)
            return { previous: current, numberOfIncreases: ++acc.numberOfIncreases };
        else
            return { previous: current, numberOfIncreases: acc.numberOfIncreases };
    }
    
    countIncreases(pInput: number[]): ResultAcc {
        return pInput.reduce((acc: ResultAcc, current: number) => {
            return this.checkIfIncrease(acc, current)
        }, { previous: undefined, numberOfIncreases: 0 });
    }

}



