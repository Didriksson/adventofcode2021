import { Solution } from "../../utils/Solution";


type Entry = {
  usp: string[]
  fdov: string[]
}
type DigitPattern = {
  top: string | undefined
  topleft: string | undefined
  topright: string | undefined 
  bottomright: string | undefined
  bottomleft: string | undefined
  bottom: string | undefined
  middle: string | undefined
}

type Digit = {
  segments: string[],
  value: number,
  digits: string[]
}

const Digit0: Digit = { 
    segments: ['topleft', 'top', 'topright', 'bottomright', 'bottom', 'bottomleft'],
    value: 0,
    digits: null
}
const Digit1: Digit = {
   segments: ['bottomright', 'topright'],
   value: 1,
   digits: null
}
const Digit2: Digit = {
  segments: ['middle', 'top', 'topright', 'bottom', 'bottomleft'],
  value: 2,
  digits: null
} 
const Digit3: Digit = {
  segments: ['middle', 'top', 'topright', 'bottomright', 'bottom'],
  value: 3,
  digits: null
} 
const Digit4: Digit = {
  segments: ['topleft', 'middle', 'topright', 'bottomright'],
  value: 4,
  digits: null
} 
const Digit5: Digit = {
  segments: ['middle','topleft', 'top', 'bottomright', 'bottom'],
  value: 5,
  digits: null
} 
const Digit6: Digit = {
  segments: ['middle','topleft', 'top', 'bottomright', 'bottom', 'bottomleft'],
  value: 6,
  digits: null
} 
const Digit7: Digit = {
  segments: ['top', 'topright', 'bottomright'],
  value: 7,
  digits: null
} 
const Digit8: Digit= {
  segments: ['middle','topleft', 'top', 'topright', 'bottomright', 'bottom', 'bottomleft'],
  value: 8,
  digits: null
} 
const Digit9: Digit = {
  segments: ['middle','topleft', 'top', 'topright', 'bottomright', 'bottom'],
  value: 9,
  digits: null
} 

export class Day8 extends Solution {
  
  parse = (input: string):Entry[] => {
    return this.parseInput(input)
      .map(rawEntry => {
        return {
          usp: rawEntry.split(" | ")[0].split(new RegExp('\\s+')),
          fdov: rawEntry.split(" | ")[1].split(new RegExp('\\s+'))  
        }
      }); 
  }
  solveA = (input: string): any => {
      const entries: Entry[] = this.parse(input);
      const result = entries
        .flatMap(e => e.fdov)          
        .map(output => output.length)
        .filter(output => output === Digit1.segments.length || output === Digit4.segments.length || output === Digit7.segments.length  || output === Digit8.segments.length )
      return result.length;
  };

  solveB = (input: string): any => {
    const entries: Entry[] = this.parse(input);
    return entries.map(e => {
      var digitpattern: DigitPattern = {
        top: undefined,
        topleft: undefined,
        topright: undefined ,
        bottomright: undefined,
        bottomleft: undefined,
        bottom: undefined,
        middle: undefined,
      }
  
      this.findTop(e.usp, digitpattern);
      this.findBottom(e.usp, digitpattern);      
      this.findMiddle(e.usp, digitpattern);
      this.findTopLeft(e.usp, digitpattern);
      this.findBottomLeft(e.usp, digitpattern);
      this.findTopAndBottomRight(e.usp, digitpattern)

      const digits: Digit[] = [Digit0, Digit1, Digit2, Digit3, Digit4, Digit5, Digit6, Digit7, Digit8, Digit9]
        .map(digit => {
          const charRepresentation = digit.segments.map(seg => digitpattern[seg]);
          return {
              segments: digit.segments,
              value: digit.value,
              digits: charRepresentation
          }
        });

      return e.fdov.flatMap(output => this.getNumber(output, digits)).join('');
    }).reduce((a,b) => a + +b, 0);
  };

  getNumber = (output: string, digitpattern: Digit[]) => {    
    return digitpattern.filter(digit => output.length === digit.digits.length).filter(digit => digit.digits.every(d => output.includes(d))).map(d => d.value)
  }

  findTopAndBottomRight(usp: string[], digitpattern: DigitPattern) {
    const digit6: string[] = usp.filter(s => s.length === 6).filter(s => s.includes(digitpattern.bottom) &&  s.includes(digitpattern.bottomleft) && s.includes(digitpattern.middle) && s.includes(digitpattern.topleft) && s.includes(digitpattern.top))[0].split('')
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    digitpattern.bottomright = digit6.filter(s => s !== digitpattern.bottom && s !== digitpattern.bottomleft && s !== digitpattern.middle && s !== digitpattern.topleft && s !== digitpattern.top).join('');
    digitpattern.topright = digit1.filter(s => s !== digitpattern.bottomright).join('');
  }

  findBottomLeft(usp: string[], digitpattern: DigitPattern) {
    const digit8: string[] = usp.filter(s => s.length === 7)[0].split('')
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    digitpattern.bottomleft = digit8.filter(s => !digit1.includes(s) && s !== digitpattern.top && s !== digitpattern.middle && s !== digitpattern.topleft && s !== digitpattern.bottom).join('')
  }

  findTopLeft(usp: string[], digitpattern: DigitPattern) {
    const digit4: string[] = usp.filter(s => s.length === 4)[0].split('')
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    digitpattern.topleft = digit4.filter(s => !digit1.includes(s) && s !== digitpattern.middle).join();
  }

  findMiddle(usp: string[], digitpattern: DigitPattern) {
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    const digit3: string[] = usp.filter(s => s.length === 5).filter(s => s.includes(digit1[0]) && s.includes(digit1[1]))[0].split('')
    digitpattern.middle = digit3.filter(c => !digit1.includes(c) && c !== digitpattern.top && c !== digitpattern.bottom).join('')
  }

  findBottom(usp: string[], digitpattern: DigitPattern){
    const digit4: string[] = usp.filter(s => s.length === 4)[0].split('')
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    const digit3: string[] = usp.filter(s => s.length === 5).filter(s => s.includes(digit1[0]) && s.includes(digit1[1]))[0].split('')
    digitpattern.bottom = digit3.filter(c => !digit4.includes(c) && c !== digitpattern.top).join('')
  }

  findTop(usp: string[], digitpattern: DigitPattern){
    const digit1: string[] = usp.filter(s => s.length === 2)[0].split('')
    const digit7: string[] = usp.filter(s => s.length === 3)[0].split('')
    digitpattern.top = digit7.filter(c => !digit1.includes(c)).join('');
  }
}

