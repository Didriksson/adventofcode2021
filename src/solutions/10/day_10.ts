import { Solution } from "../../utils/Solution";

const OPEN_CHARS = ['(', '[', '<', '{']
const CLOSE_CHARS = [')', ']', '>', '}']
type LineResult = {
  corruptedChunk: string[],
  incomplete: string[]
}
export class Day10 extends Solution {
  getCorruptedChunk(it: string): LineResult{
    const openings:string[] = []
    const chunk = []
    const finished = it.split('').every(c => {
      if (OPEN_CHARS.includes(c)) {
        openings.push(c);
        chunk.push(c)
        return true;
      } else if (CLOSE_CHARS.includes(c)) {
        chunk.push(c)
        if (c === ')') {
          if (openings.pop() === '(') {
            return true;
          } else {
            return false;
          }
        } if (c === '}') {
          if (openings.pop() === '{') {
            return true;
          } else {
            return false;
          }
        } if (c === ']') {
          if (openings.pop() === '[') {
            return true;
          } else {
            return false;
          }
        } if (c === '>') {
          if (openings.pop() === '<') {
            return true;
          } else {
            return false;
          }
        }
      } else {
        throw new Error("Ska inte ske.");
      }
    })
    if (finished && openings.length !== 0) {
      return { 
        corruptedChunk: [],
        incomplete: openings
      }
    }
    return {
      corruptedChunk: chunk,
      incomplete: []
    };
  }
  solveA = (input: String): any => {
    const parse = this.parseInput(input);
    const chunks = parse.map(it => this.getCorruptedChunk(it)).filter(String);
    return chunks.map(it => it.corruptedChunk).filter(String).map(chunk => chunk.pop()).map(p => {
      if(p === ')'){return 3}
      if(p === ']'){return 57}
      if(p === '}'){return 1197}
      if(p === '>'){return 25137}
    }).reduce((a, b) => a + b, 0);
  };

  solveB = (input: String): any => {
    const parse = this.parseInput(input);
    const chunks = parse.map(it => this.getCorruptedChunk(it)).filter(String);
    const completeByAdding = chunks
      .map(it => it.incomplete)
      .filter(String)
      .map(c => c.reverse())
      .map(remainingOpenings => {
        return remainingOpenings.map(ro => {
          if(ro === '('){return ')'}
          if(ro === '['){return ']'}
          if(ro === '{'){return '}'}
          if(ro === '<'){return '>'}  
        })
      })
      .map(cl =>
        cl.reduce((a,b) => {
          var addValue;
          if(b === ')'){addValue =  1}
          if(b === ']'){addValue = 2}
          if(b === '}'){addValue = 3}
          if(b === '>'){addValue = 4}
          return (a * 5) + addValue;
        }, 0))
        .sort((a,b) => {
          if(a > b) { return -1 } 
          if(a < b) { return 1 } 
          return 0;
        });

    return completeByAdding[Math.floor(completeByAdding.length/2)];
  };
}
