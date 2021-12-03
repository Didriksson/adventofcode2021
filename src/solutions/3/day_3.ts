import { Solution } from "../../utils/Solution";

type ResultAcc = {
    gammarate: string
    epsilonrate: string
}


export class Day3 extends Solution{

    solveA = (input: String): any => {
        const pInput = this.parseInput(input);
        var result: ResultAcc = {
            gammarate: '',
            epsilonrate: ''
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
                gammarate: result.gammarate + gammarate,
                epsilonrate: result.epsilonrate + epsilonrate
            }
        }
        return Number.parseInt(result.epsilonrate, 2) * Number.parseInt(result.gammarate, 2);
    }
    
    solveB = (input: String): any => {        
     
    }
}


