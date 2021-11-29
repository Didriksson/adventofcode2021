import { SolutionUtils } from "../../utils/SolutionUtils";
var bench = require('nanobench')
const path = require('path');


export const solve = (input: String): any => {        
    const pInput: number[] = SolutionUtils.parseInputToNumbers(input)
    const result = pInput.reduce((acc, current) => acc + current, 0);
    return result;
}

// istanbul ignore next
if (require.main === module) {    
    bench('Solving day 0', function (b: { start: () => void; end: () => void; }) { 
        const input = SolutionUtils.readFile(path.join(__dirname, "day_0.input"));
        b.start()
        const result = solve(input);
        console.log(`Result: ${result}`);
        b.end();
    });
}