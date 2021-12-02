import { Solution } from "../../utils/Solution";
const path = require('path');

export class Day2 extends Solution{

    solveA = (input: String): any => {
        const pInput = this.parseInput(input);
        var positionH = 0;
        var depth = 0;
        pInput.forEach(instructionRaw => {
            const instruction = instructionRaw.split(" ")[0];
            const value = instructionRaw.split(" ")[1];

            if(instruction === 'forward'){
                positionH += +value;
            }
            if(instruction === 'down'){
                depth += +value;
            }
            if(instruction === 'up'){
                depth -= +value
            }
        });

        return positionH * depth;        
    }
    
    solveB = (input: String): any => {        
        const pInput = this.parseInput(input);
        var positionH = 0;
        var depth = 0;
        var aim = 0;

        pInput.forEach(instructionRaw => {
            const instruction = instructionRaw.split(" ")[0];
            const value = instructionRaw.split(" ")[1];

            if(instruction === 'forward'){
                positionH += +value;
                depth += (aim * +value)
            }
            if(instruction === 'down'){
                aim += +value;
            }
            if(instruction === 'up'){
                aim -= +value
            }
        });

        return positionH * depth;        
    }
}

