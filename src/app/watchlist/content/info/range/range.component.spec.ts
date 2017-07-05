import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {RangeComponent} from './range.component';

@Component({
  template: `
    <mp-range [options]="options"></mp-range>`
})
class TestComponent {
  @ViewChild(RangeComponent) rangeComponent: RangeComponent;
  options: any;
}

describe('RangeComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RangeComponent,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set position when options are passed', () => {
    component.options = null;
    fixture.detectChanges();
    expect(component.rangeComponent.position).toEqual({});

    component.options = {
      start: 10,
      end: 20,
      activeStart: 15,
      activeEnd: 16,
      active: 15
    };
    fixture.detectChanges();
    expect(component.rangeComponent.position.left).toBe(50);
    expect(component.rangeComponent.position.width).toBe(10);
    expect(component.rangeComponent.position.pin).toBe(50);
  });
});
