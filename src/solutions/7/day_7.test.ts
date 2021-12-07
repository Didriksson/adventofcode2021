import { Day7 } from "./day_7";

test('Testinstructions part A should give value 5', () => {
    expect(new Day7().solveA(`16,1,2,0,4,2,7,1,2,14`)).toBe(37); 
    expect(new Day7().solveB(`16,1,2,0,4,2,7,1,2,14`)).toBe(168); 
});
