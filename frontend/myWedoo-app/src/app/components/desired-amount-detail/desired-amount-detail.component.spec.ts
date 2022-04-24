import { IAmountDetail } from './../../models/amount-detail';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiredAmountDetailComponent } from './desired-amount-detail.component';

describe('DesiredAmountDetailComponent', () => {
  let component: DesiredAmountDetailComponent;
  let fixture: ComponentFixture<DesiredAmountDetailComponent>;
  let mockCardsCombination: IAmountDetail;

  beforeEach(() => {

    //MOCKS
    mockCardsCombination = {
        "value": 75,
        "cards": [
            43,
            32
        ]
      }

    TestBed.configureTestingModule({
      declarations: [ DesiredAmountDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesiredAmountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of cards', () => {

    component.cardCombinations = mockCardsCombination;

    let ulElement = fixture.nativeElement.querySelector('ul');

    fixture.detectChanges();

    expect(ulElement.children.length).toBe(2);
    expect(ulElement.children[0].textContent).toBe(' 43 ');
    expect(ulElement.children[1].textContent).toBe(' 32 ');
  });

});
