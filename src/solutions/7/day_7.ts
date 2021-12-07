import { Solution } from "../../utils/Solution";

type TravelCost = {
  position: number
  fuel: number    
}

export class Day7 extends Solution {

  solveA = (input: string): any => {
    const horizontalPositions = this.parseRowToNumbers(input, new RegExp("\\,"));
    const travelcosts = horizontalPositions.map(position => {
      const fuel = horizontalPositions
        .map(toMove => Math.abs(position - toMove))
        .reduce((a,b) => a + b, 0);
      return {
        position,
        fuel
      }
    });

    return travelcosts.reduce((prev, current) => prev.fuel < current.fuel ? prev : current).fuel
  };

  solveB = (input: string): any => {
    const horizontalPositions:number[] = this.parseRowToNumbers(input, new RegExp("\\,"));
    const max = Math.max(...horizontalPositions);
    const min = Math.min(...horizontalPositions);
    const travelcosts = Array.from(Array(max+1).keys()).map(n => n + min).map(position => {
      const fuel = horizontalPositions
        .map(toMove => Math.abs(position - toMove))
        .map(delta => (delta * (delta+1)) / 2)
        .reduce((a,b) => a + b, 0);
      return {
        position,
        fuel
      }
    });

    return travelcosts.reduce((prev, current) => prev.fuel < current.fuel ? prev : current).fuel
  };
}
