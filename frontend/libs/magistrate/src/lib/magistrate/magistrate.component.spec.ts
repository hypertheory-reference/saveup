import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagistrateComponent } from './magistrate.component';

describe('MagistrateComponent', () => {
  let component: MagistrateComponent;
  let fixture: ComponentFixture<MagistrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagistrateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MagistrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
