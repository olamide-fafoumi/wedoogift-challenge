import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Amount } from 'src/app/models/amount';
import { AmountService } from './../../services/amount.service';
import { DesiredAmountDetailComponent } from './../desired-amount-detail/desired-amount-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiredAmountComponent } from './desired-amount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DesiredAmountComponent', () => {

  let component: DesiredAmountComponent;
  let fixture: ComponentFixture<DesiredAmountComponent>;
  let mockCeilFloorReturnValue: Amount;
  let mockCeilReturnValue: Amount;
  let mockFloorReturnValue: Amount;
  let mockEqualAmountReturnValue: Amount;
  let mockMinusPlusAmountReturnValue: Amount;
  let mockAmountService = jasmine.createSpyObj(['getAmountDetail']);

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

    mockCeilReturnValue = {
      "ceil": {
        "value": 20,
        "cards": [
            20
        ]
      }
    } as Amount;

    mockFloorReturnValue = {
      "floor": {
        "value": 70,
        "cards": [
            35,
            35
        ]
      }
    } as Amount;

    mockEqualAmountReturnValue = {
      "equal": {
        "value": 25,
        "cards": [
            25
        ]
      },
      "floor": {
        "value": 25,
        "cards": [
            25
        ]
      },
      "ceil": {
        "value": 25,
        "cards": [
            25
        ]
      }
    };

    mockMinusPlusAmountReturnValue = {
      "floor": {
        "value": 70,
        "cards": [
            35,
            35
        ]
      },
      "ceil": {
        "value": 57,
        "cards": [
            35,
            22
        ]
      }
    } as Amount;

    TestBed.configureTestingModule({
      declarations: [ DesiredAmountComponent, DesiredAmountDetailComponent ],
      imports: [
        HttpClientModule, 
        MatSnackBarModule, 
        MatDialogModule, 
        FormsModule, 
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AmountService,
          useValue: mockAmountService
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    mockAmountService.getAmountDetail.calls.reset();

    fixture = TestBed.createComponent(DesiredAmountComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create DesiredAmountComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve cards combination for good amount', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 25
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockEqualAmountReturnValue));

    component.getCardsCombination();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(25);
    expect(component.equalAmountData).toEqual(mockEqualAmountReturnValue.equal);
  });

  it('should retrieve cards combination for given amount and show dialog', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 23
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockCeilFloorReturnValue));

    component.getCardsCombination();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(23);
  });

  it('should retrieve cards combination for lowest amount and show snackbar', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 0
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockCeilReturnValue));

    component.getCardsCombination();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(0);
    expect(component.amountFormGroup.get('amountFormControl')?.value).toEqual(mockCeilReturnValue.ceil.value);
  });

  it('should retrieve cards combination for highest amount and show snackbar', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 80
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockFloorReturnValue));

    component.getCardsCombination();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(80);
    expect(component.amountFormGroup.get('amountFormControl')?.value).toEqual(mockFloorReturnValue.floor.value);
  });

  it('should retrieve amount minus', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 60
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockMinusPlusAmountReturnValue));

    component.getMinusAmount();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(60);
    expect(component.amountFormGroup.get('amountFormControl')?.value).toEqual(mockMinusPlusAmountReturnValue.floor.value);
  });

  it('should retrieve amount plus', () => {

    component.amountFormGroup.setValue({
      amountFormControl: 60
    });

    mockAmountService.getAmountDetail.and.returnValue(of(mockMinusPlusAmountReturnValue));

    component.getPlusAmount();
    
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledTimes(1);
    expect(mockAmountService.getAmountDetail).toHaveBeenCalledWith(60);
    expect(component.amountFormGroup.get('amountFormControl')?.value).toEqual(mockMinusPlusAmountReturnValue.ceil.value);
  });

});
