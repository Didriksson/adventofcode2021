import { Day6 } from "./day_6";

test('Testinstructions part A should give value 5', () => {
    expect(new Day6().solveA(`3,4,3,1,2`)).toBe(5934); 
    expect(new Day6().solveB(`3,4,3,1,2`)).toBe(26984457539); 
});
