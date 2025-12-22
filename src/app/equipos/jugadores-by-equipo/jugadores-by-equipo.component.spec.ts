import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresByEquipoComponent } from './jugadores-by-equipo.component';

describe('JugadoresByEquipoComponent', () => {
  let component: JugadoresByEquipoComponent;
  let fixture: ComponentFixture<JugadoresByEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresByEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadoresByEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
