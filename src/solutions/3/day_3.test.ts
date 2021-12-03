import { Day3 } from "./day_3";

test('Testinstructions part A should give value 198', () => {
    expect(new Day3().solveA(`00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`)).toBe(198);
  });
  
