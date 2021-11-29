import { solve } from "./day_0";

test('Adds all numbers in input', () => {
    expect(solve(`1
    2
    3
    4
    5
    6`)).toBe(21);
  });