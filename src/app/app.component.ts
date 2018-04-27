/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <form (ngSubmit)="submitState(localState.value)" autocomplete="off">

      <input
        [value]="localState.value"
        (input)="localState.value = $event.target.value"
        placeholder=""
        autofocus>
      <h2>{{result}}</h2>
      <button>Submit Value</button>
    </form>
  `
})
export class AppComponent implements OnInit {
  public name = 'Angular Starter';
  public tipe = 'assets/img/tipe.png';
  public twitter = 'https://twitter.com/gdi2290';
  public url = 'https://tipe.io';
  public showDevModule: boolean = environment.showDevModule;
  public localState = { value: '' };
  public result = 0;

  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('result', this.main('2 + 3 * 2 + ( 2 - 100 )'));
    console.log('Initial App State', this.appState.state);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
    this.result = this.main(value);
  }

  public calSwitch(first, second, operator): number {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
    }
  }

  public putBackToArray(arr: any[], index, result) {
    arr.splice(index, 2, result);
  }

  public cal(operators, values) {
    const curOperators = this.getUntilOpen(operators);
    const curValues = this.getUntilOpen(values);
    this.loopSequence(curValues, curOperators, values);
  }

  public loopSequence(curValues, curOperators, values) {
    ['/', '*', '+', '-'].forEach((oper) => {
      let index = 0;
      console.log('=================');
      while (index < curOperators.length) {
        console.log(`${curOperators[index]} vs ${oper}`);
        console.log(curOperators);
        if (curOperators[index] === oper) {
          const first = curValues[index + 1];
          const second = curValues[index];
          const result = this.calSwitch(first, second, curOperators[index]);
          curValues.splice(index, 2, result);
          curOperators.splice(index, 1);
          index = 0;
        } else {
          index++;
        }
        console.log(`index ${index} vs curOperators.length ${curOperators.length}`);
      }
    });
    values.push(curValues[0]);
  }

  public getUntilOpen(arr: any[]) {
    const cur = [];
    let limit = 10;
    while (arr.length > 0 && arr[arr.length - 1] !== '(' && limit > 0) {
      cur.push(arr.pop());
      limit--;
    }
    arr.pop();
    return cur;
  }

  public main(expr) {
    // const expr = '( ( 1 + 2 * 5 ) + 3 + -5 )';
    // const expr = '1 + 1 + 3 + 5 + 4';
    const tokens = expr.split(' ');
    const operators = [];
    const values = [];
    tokens.forEach((token) => {
      switch (token) {
        case '(':
          // Ignore left parentheses.
          operators.push(token);
          values.push(token);
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case 'sqrt':
          operators.push(token);
          break;
        case ')':
          this.cal(operators, values);
          break;
        default:
          values.push(parseInt(token, 10));
          break;
      }
    });
    if (values.length > 1) {
      const newValue = [];
      this.loopSequence(values, operators, newValue);
      return this.returnResult(newValue[0]);
    } else {
      return this.returnResult(values[0]);
    }
  }

  public returnResult(n) {
    if (this.isFloat(n)) {
      return parseFloat(n.toFixed(10));
    } else {
      return n;
    }
  }

  public isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
