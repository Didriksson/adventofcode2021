import { solveA, solveB } from "./day_1";

test('Count increases should be 7', () => {
    expect(solveA(`199
    200
    208
    210
    200
    207
    240
    269
    260
    263`)).toBe(7);
  });

  test('Part B should be 5', () => {
    expect(solveB(`199
    200
    208
    210
    200
    207
    240
    269
    260
    263`)).toBe(5);
  });
