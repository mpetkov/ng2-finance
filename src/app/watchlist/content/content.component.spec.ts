import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {ContentComponent} from './content.component';

@Component({selector: 'mp-chart', template: ''})
class ChartComponent {
}

@Component({selector: 'mp-info', template: ''})
class InfoComponent {
}

@Component({selector: 'mp-news', template: ''})
class NewsComponent {
}

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent,
        ChartComponent,
        InfoComponent,
        NewsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ChartComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-chart')).not.toBeNull();
  });

  it('should have a InfoComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-info')).not.toBeNull();
  });

  it('should have a NewsComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-news')).not.toBeNull();
  });
});
