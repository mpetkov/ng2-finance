import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MdlModule} from 'angular2-mdl';
import {SearchBoxComponent} from './search-box.component';

@Component({
  template: `
    <mp-search-box
      [active]="active"
      [value]="value"></mp-search-box>`
})
class TestComponent {
  active: boolean;
  value: string;
}

describe('SearchBoxComponent', () => {
  let fixture: ComponentFixture<SearchBoxComponent>;
  let component: SearchBoxComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule,
        ReactiveFormsModule
      ],
      declarations: [
        SearchBoxComponent,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add css class `mp-inactive` to container when active is false', () => {
    const element: any = fixture.nativeElement.querySelector('.mp-search-box');
    expect(element.classList).toContain('mp-inactive');

    component.active = true;
    fixture.detectChanges();
    expect(element.classList).not.toContain('mp-inactive');
  });

  it('should call activate#emit() when activateInput() is called', () => {
    spyOn(component.activate, 'emit');

    component.activateInput();
    fixture.detectChanges();
    expect(component.activate.emit).toHaveBeenCalledTimes(1);
    expect(component.activate.emit).toHaveBeenCalledWith(true);

    component.activateInput();
    fixture.detectChanges();
    expect(component.activate.emit).toHaveBeenCalledTimes(1);
  });

  it('should call activate#emit() when user clicks outside of the search bar', () => {
    spyOn(component.activate, 'emit');

    component.activateInput();
    fixture.detectChanges();
    fixture.nativeElement.click();
    expect(component.activate.emit).toHaveBeenCalledTimes(2);
    expect(component.activate.emit).toHaveBeenCalledWith(false);
  });

  it('should show clear button when input field has text', () => {
    expect(fixture.nativeElement.querySelector('.mp-clear')).toBeNull();

    component.formControl.setValue('test', {});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-clear')).not.toBeNull();
  });

  it('should call changed#emit() when clear button is clicked', () => {
    spyOn(component.changed, 'emit');

    component.formControl.setValue('test', {});
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-clear').click();
    expect(component.changed.emit).toHaveBeenCalledTimes(1);
    expect(component.changed.emit).toHaveBeenCalledWith(null);
  });

  it('should populate input with the passed value', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    let fixtureTest: ComponentFixture<TestComponent>;
    let componentTest: TestComponent;

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();

    componentTest.value = 'a';
    fixtureTest.detectChanges();
    expect(fixtureTest.nativeElement.querySelector('input').value).toBe('a');

    componentTest.active = true;
    fixtureTest.detectChanges();
    jasmine.clock().tick(0);
    expect(fixtureTest.nativeElement.querySelector('input').value).toBe('a');
    jasmine.clock().uninstall();
  });
});
