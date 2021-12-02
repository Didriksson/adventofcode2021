import { Day2 } from "./day_2";

test('Testinstructions part A should give value 150', () => {
    expect(new Day2().solveA(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`)).toBe(150);
  });
  
  test('Testinstructions part B should give value 900', () => {
    expect(new Day2().solveA(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`)).toBe(150);
  });
