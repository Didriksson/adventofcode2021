import { Solution } from "../../utils/Solution";
type Point = {
  row: number;
  col: number;
};

export class Day9 extends Solution {
  getValue(cave: number[][], row: number, col: number): number {
    try {
      const value = cave[row][col];
      return value !== undefined ? value : 9;
    } catch (e) {
      return 9;
    }
  }

  getLowpoints(cave: number[][]) {
    const lowpoints: Point[] = [];
    for (let row = 0; row < cave.length; row++) {
      for (let col = 0; col < cave[0].length; col++) {
        if (
          this.getValue(cave, row, col) < this.getValue(cave, row, col + 1) &&
          this.getValue(cave, row, col) < this.getValue(cave, row, col - 1) &&
          this.getValue(cave, row, col) < this.getValue(cave, row + 1, col) &&
          this.getValue(cave, row, col) < this.getValue(cave, row - 1, col)
        ) {
          lowpoints.push({ row, col });
        }
      }
    }

    return lowpoints;
  }

  solveA = (input: String): any => {
    const cave = this.parseInput(input).map((r) => r.split("").map((n) => +n));
    const lowpoints = this.getLowpoints(cave);
    return lowpoints
      .map((point) => cave[point.row][point.col])
      .map((h) => h + 1)
      .reduce((a, b) => a + b, 0);
  };

  solveB = (input: String): any => {
    const cave = this.parseInput(input).map((r) => r.split("").map((n) => +n));
    const lowpoints = this.getLowpoints(cave);
    console.log(lowpoints)
    const result = lowpoints.map((lowpoint) => {
      const basin: Point[] = [lowpoint]
      const pointsToCheck: Point[] = [lowpoint]
      do{
        const foundPoints = this.checkSourroundings(cave, pointsToCheck.pop());
        const newPoints = foundPoints.filter(p => !basin.find(pc => p.col === pc.col && p.row === pc.row)); 
        newPoints.forEach(p =>{ basin.push(p)});
        newPoints.filter(p => !pointsToCheck.find(pc => p.row === pc.row && p.col === pc.col)).forEach(p => pointsToCheck.push(p))
    } while(pointsToCheck.length > 0);
    return basin;
    });
    const sortedResults = result.map(points => points.length).sort((a,b) => {
      if(a > b) { return -1 } 
      if(a < b) { return 1 } 
      return 0;
    });
    return sortedResults[0] * sortedResults[1] * sortedResults[2];

  };


  checkSourroundings(cave: number[][], point: Point): Point[] {
    const inBasin: Point[] = [];
    const left = this.getValue(cave, point.row, point.col - 1);
    const top = this.getValue(cave, point.row - 1, point.col);
    const right = this.getValue(cave, point.row, point.col + 1);
    const bottom = this.getValue(cave, point.row + 1, point.col);

    if (left !== 9) {
      inBasin.push({
        row: point.row,
        col: point.col - 1,
      });
    }

    if (top !== 9) {
      inBasin.push({
        row: point.row - 1,
        col: point.col,
      });
    }

    if (right !== 9) {
      inBasin.push({
        row: point.row,
        col: point.col + 1,
      });
    }

    if (bottom !== 9) {
      inBasin.push({
        row: point.row + 1,
        col: point.col,
      });
    }

    return inBasin;
  }
}
