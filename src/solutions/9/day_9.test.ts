import { Day9 } from "./day_9";

test('Testinstructions part A', () => {
    expect(new Day9().solveA(`2199943210
    3987894921
    9856789892
    8767896789
    9899965678`)).toBe(15);         
});

test('Testinstructions part B', () => {
    expect(new Day9().solveB(`2199943210
    3987894921
    9856789892
    8767896789
    9899965678`)).toBe(1134);       
})
