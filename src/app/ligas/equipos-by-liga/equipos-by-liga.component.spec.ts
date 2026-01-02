import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposByLigaComponent } from './equipos-by-liga.component';

describe('EquiposByLigaComponent', () => {
  let component: EquiposByLigaComponent;
  let fixture: ComponentFixture<EquiposByLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposByLigaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposByLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
