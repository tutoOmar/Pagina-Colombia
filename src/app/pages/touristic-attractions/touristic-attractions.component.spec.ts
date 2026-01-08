import { ComponentFixture, TestBed } from '@angular/core/testing';
import TouristicAttractionsComponent from './touristic-attractions.component';


describe('TouristicAttractionsComponent', () => {
  let component: TouristicAttractionsComponent;
  let fixture: ComponentFixture<TouristicAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristicAttractionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristicAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
