import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppState]
    })
      /**
       * Compile template and css
       */
      .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be @TipeIO`, () => {
    expect(comp.twitter).toEqual('https://twitter.com/gdi2290');
    expect(comp.tipe).toEqual('assets/img/tipe.png');
    expect(comp.name).toEqual('Angular Starter');
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

  it('1 + 1 + 3 + 5 + 4', () => {
    expect(comp.main('1 + 1 + 3 + 5 + 4')).toEqual(14);
  });

  it('1 * 2 * 3 * 4 * 5', () => {
    expect(comp.main('1 * 2 * 3 * 4 * 5')).toEqual(120);
  });

  it('1 + 2 * 3 - 1 / 20', () => {
    expect(comp.main('1 + 2 * 3 - 1 / 20')).toEqual(6.95);
  });

  it('1 / 20 / 30 * 50 + 10', () => {
    expect(comp.main('1 / 20 / 30 * 50 + 10')).toEqual(10.0833333333);
  });

  it('1 + (29 + 45) * 100', () => {
    expect(comp.main('1 + ( 29 + 45 ) * 100')).toEqual(7401);
  });

  it('1 + 50 / 20 * (1 + 1)', () => {
    expect(comp.main('1 + 50 / 20 * ( 1 + 1 )')).toEqual(6);
  });

  it('90 / 10 * (20 + 0) - 1', () => {
    expect(comp.main('90 / 10 * ( 20 + 0 ) - 1')).toEqual(179);
  });

  it('( ( 1 + 2 * 5 ) - 100 )', () => {
    expect(comp.main('( ( 1 + 2 * 5 ) - 100 )')).toEqual(-89);
  });

});
