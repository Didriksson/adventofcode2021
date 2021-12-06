import { Solution } from "../../utils/Solution";
import { countBy } from "lodash";

export class Day6 extends Solution {
  solveForDays(input: string, days: number) {
    var rawInput = this.parseRowToNumbers(input, new RegExp("\\,"));
    const countOfage = countBy(rawInput);
    var shoals = new Map<number, number>();
    Object.keys(countOfage).map((x) => shoals.set(+x, countOfage[x]));

    for (let index = 0; index < days; index++) {
      const updatesShoals = new Map<number, number>();
      Array.from(shoals).map(([key, value]) => {
        if (key === 0) {
          const previousvalue = updatesShoals.has(6) ? updatesShoals.get(6) : 0;
          updatesShoals.set(6, previousvalue + value);
          updatesShoals.set(8, value);
        } else {
          const previousvalue = updatesShoals.has(key - 1)
            ? updatesShoals.get(key - 1)
            : 0;
          updatesShoals.set(key - 1, previousvalue + value);
        }
      });
      shoals = updatesShoals;
    }
    return Array.from(shoals.values()).reduce((a, b) => a + b, 0);
  }

  solveA = (input: string): any => {
    return this.solveForDays(input, 80);
  };

  solveB = (input: string): any => {
    return this.solveForDays(input, 256);
  };
}
