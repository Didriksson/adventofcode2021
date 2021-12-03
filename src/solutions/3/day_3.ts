import { Solution } from "../../utils/Solution";

type ResultAcc = {
    mostCommongBits: string
    leastCommonBits: string
}


export class Day3 extends Solution{

    calculateLeastAndMostBits(pInput: string[]){
        var result: ResultAcc = {
            mostCommongBits: '',
            leastCommonBits: ''
        }
        for (let col = 0; col < pInput[0].length; col++) {
            const counter = new Map<string, number>();

            counter.set('0', 0);
            counter.set('1', 0);

            pInput.forEach(row => {
                counter.set(row[col], counter.get(row[col]) + 1)
            });
            const gammarate = counter.get('0') > counter.get('1') ? '0' : '1'
            const epsilonrate = counter.get('0') > counter.get('1') ? '1' : '0'
            result = {
                mostCommongBits: result.mostCommongBits + gammarate,
                leastCommonBits: result.leastCommonBits + epsilonrate
            }
        }
        return result;
    }

    solveA = (input: String): any => {
        const pInput = this.parseInput(input);
        const result = this.calculateLeastAndMostBits(pInput);
        return Number.parseInt(result.mostCommongBits, 2) * Number.parseInt(result.leastCommonBits, 2);
    }
    
    solveB = (input: String): any => {        
        var oxygen = this.parseInput(input);
        var co2scrubber = this.parseInput(input);
        for (let index = 0; index < oxygen[0].length && co2scrubber.length > 1; index++) {
            const leastAndMost = this.calculateLeastAndMostBits(oxygen);
            oxygen = oxygen.filter(row => row[index] === leastAndMost.mostCommongBits[index]);
        }
        
        for (let index = 0; index < co2scrubber[0].length && co2scrubber.length > 1; index++) {
            const leastAndMost = this.calculateLeastAndMostBits(co2scrubber);
            co2scrubber = co2scrubber.filter(row => row[index] === leastAndMost.leastCommonBits[index]);
        }
        
        return Number.parseInt(oxygen[0], 2) * Number.parseInt(co2scrubber[0], 2)
    }
}


