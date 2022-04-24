import { Amount } from 'src/app/models/amount';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockCeilFloorReturnValue;

  beforeEach(() => {

    // MOCKS
    mockCeilFloorReturnValue = {
      "floor": {
        "value": 22,
        "cards": [
            22
        ]
      },
      "ceil": {
        "value": 25,
        "cards": [
            25
        ]
      }
    } as Amount;

    TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }, 
        {
          provide: MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.possibleAmount = mockCeilFloorReturnValue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should display the avaible amounts', () => {

      let divElement = fixture.nativeElement.querySelector('div');

      expect(divElement.children.length).toBe(2);
      expect(divElement.children[0].textContent).toBe(' 22 ');
      expect(divElement.children[1].textContent).toBe(' 25 ');
  });
});
