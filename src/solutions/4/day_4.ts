
import { Solution } from "../../utils/Solution";
import { unzip } from 'lodash';

type BoardCell = {
    value: number
    marked: boolean
}

export class Board {

    constructor(rows: BoardCell[][]) {
        this.rows = rows;
    }

    markNumber(number: number): void {
        this.rows = this.rows
            .map(row => 
                row.map(
                    cell => cell.value === number ? 
                        {marked: true, value: cell.value } : cell))
    }

    sumAllUnmarked(): number {
        const sum =  this.rows.map(row => 
            row.filter(b => !b.marked)
                .reduce((a,b) => a + b.value, 0))
            .reduce((a,b) => a + b, 0);
        return sum;
    }

    bingo(): boolean {
        const isBingo = this.rows
            .some(row => 
                row.every(r => r.marked));
        
        return isBingo ? isBingo : unzip(this.rows)
                .some(row => 
                    row.every(r => r.marked));
    }

    rows: BoardCell[][]

    public toString(): string {
        const rowStrings = this.rows.map(
            row => 
                row.map(x => 
                    `${x.value}${x.marked ? '*':''}`)
                .join());

        return rowStrings.join("\n");
    }

}

type Bingo = {
    boards: Board[],
    drawNumbers: number[]
    lastDrawn: number;
    lastBingo: Board
}


export class Day4 extends Solution{

    parseNumbersAndBoards(input: string): Bingo{
        const rawinput = this.parseInput(input);
        const drawNumbers = this.parseRowToNumbers(rawinput.shift(), new RegExp(','));
        const boards = [];
        rawinput.shift();
        while(rawinput.length > 0){
            const rows: BoardCell[][] = rawinput.splice(0, 5).map(x => this.parseRowToNumbers(x).map(x => { 
                return { 
                    value: x,
                    marked: false
                }}))
            boards.push(new Board(rows));
            rawinput.shift();
        }
        const lastDrawn = -1; 
        const lastBingo = undefined
        return {
            drawNumbers,
            boards,
            lastDrawn,
            lastBingo
        }
    }

    solveA = (input: string): any => {
        var bingo = this.parseNumbersAndBoards(input);
        while(!bingo.boards.some(b => b.bingo())){
            const drawn = bingo.drawNumbers.shift();
            bingo.boards.forEach(b => b.markNumber(drawn));
            bingo = {
                lastDrawn: drawn,
                boards: bingo.boards,
                drawNumbers: bingo.drawNumbers,
                lastBingo: undefined
            };
        }
        return bingo.boards
            .filter(b => b.bingo())
            .map(b => b.sumAllUnmarked() * bingo.lastDrawn)[0];
    }
    
    solveB = (input: string): any => {  
        var bingo = this.parseNumbersAndBoards(input);
        while(bingo.boards.length > 0){
            const drawn = bingo.drawNumbers.shift();
            bingo.boards.forEach(b => b.markNumber(drawn));
            bingo = {
                lastDrawn: drawn,
                boards: bingo.boards.filter(b => !b.bingo()),
                drawNumbers: bingo.drawNumbers,
                lastBingo: bingo.boards.find(b => b.bingo())
                
            };
        }
        return bingo.lastBingo.sumAllUnmarked() * bingo.lastDrawn;
    }
}


