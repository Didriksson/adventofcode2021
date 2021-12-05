
import { Solution } from "../../utils/Solution";
import { countBy } from 'lodash';

class Point {
    x: number
    y: number

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}
class Line {
    start: Point
    end: Point

    constructor(start: Point, end: Point){
        if(start.x < end.x ){
            this.start = start;
            this.end = end;                
        } else if ( start.x > end.x) {
            this.start = end;
            this.end = start;
        } else if (start.y < end.y) {
            this.start = start;
            this.end = end;                
        } else if (start.y > end.y) {
            this.start = end;
            this.end = start;
        } else {
            this.start = start;
            this.end = end;                
        }
    }

    getAllPoints(): Point[] {
        const points = []
        if(this.start.x === this.end.x || this.start.y === this.end.y){
            for (let x = this.start.x; x <= this.end.x; x++) {
                for (let y = this.start.y; y <= this.end.y; y++) {
                    points.push(new Point(x, y));
                }                
            }    
        } else {
            const distanceX = this.end.x - this.start.x;
            const distanceY = this.end.y - this.start.y;
            for (let index = 0; index <= distanceX; index++) {
                if(distanceY > 0){
                    points.push(new Point(this.start.x + index, this.start.y + index));    
                } else {
                    points.push(new Point(this.start.x + index, this.start.y - index));    
                }
            } 
        }
        return points;
    }    
}

export class Day5 extends Solution{
    parseToLines = (input: string): Line[] => {
        return this.parseInput(input)
            .map(row => row.split(' -> '))
            .map(rawPoints => rawPoints.map(p => new Point(+p.split(',')[0],+p.split(',')[1])))
            .map(points => new Line(points[0], points[1]));        
    }
    solveA = (input: string): any => {
        const lines = this.parseToLines(input)
            .filter(line => line.start.x === line.end.x || line.start.y === line.end.y);
        const allPoints = lines.flatMap(line => line.getAllPoints());
        const occurences = countBy(allPoints, (a: Point) => `${a.x},${a.y}`)
        return Object.keys(occurences)
        .filter(x => occurences[x] > 1)
        .length;
    }
    
    solveB = (input: string): any => {  
        const lines = this.parseToLines(input);
        const allPoints = lines.flatMap(line => line.getAllPoints());
        const occurences = countBy(allPoints, (a: Point) => `${a.x},${a.y}`)
        return Object.keys(occurences)
            .filter(x => occurences[x] > 1)
            .length;
    }
}


