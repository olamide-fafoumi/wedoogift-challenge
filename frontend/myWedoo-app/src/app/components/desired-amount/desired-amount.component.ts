import { HttpErrorTracker } from './../../models/http-error-tracker';
import { IAmountDetail } from './../../models/amount-detail';
import { Amount } from './../../models/amount';
import { DialogComponent } from './../dialog/dialog.component';
import { AmountService } from './../../services/amount.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-desired-amount',
  templateUrl: './desired-amount.component.html',
  styleUrls: ['./desired-amount.component.scss']
})
export class DesiredAmountComponent implements OnInit, OnDestroy {

  private _sub$ = new Subject<void>();

  amountFormGroup: FormGroup;

  @Output() 
  equalAmountData = {} as IAmountDetail;

  constructor(private _amountService: AmountService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.amountFormGroup = this.fb.group({
      amountFormControl: ''
    })
  }

  ngOnInit() {
    this.amountFormGroup.valueChanges.pipe(takeUntil(this._sub$)).subscribe(
      () => {
        this.equalAmountData = {} as IAmountDetail;
      }
    );
  }

  /**
   * Retrieves cards combination for a given amount
   */
  getCardsCombination() {
    let desiredAmount = this.amountFormGroup.get('amountFormControl')?.value
    if (desiredAmount !== null) {
      this._amountService.getAmountDetail(desiredAmount).pipe(takeUntil(this._sub$)).subscribe({
        next: result => {
          if (result.ceil && !result.equal && !result.floor) {
            this.openSnackBar('Le montant minimal possible est ' + result.ceil.value);
            this.amountFormGroup.setValue({
              amountFormControl: result.ceil.value
            });
          }
          else if (result.floor && !result.equal && !result.ceil) {
            this.openSnackBar('Le montant maximal possible est ' + result.floor.value);
            this.amountFormGroup.setValue({
              amountFormControl: result.floor.value
            });
          }
          else {
            if (result.equal)
              this.equalAmountData = result.equal;
            else 
              this.openDialog(result);
          }
        },
        error: (err: HttpErrorTracker) => {
          this.openSnackBar('An error occured with status ' + err.statusCode + '. Reason : ' + err.errorMessage);
        }
      });
    }
  }

  /**
   * Retrieves the minus of a given amount
   */
  getMinusAmount() {
    let desiredAmount = this.amountFormGroup.get('amountFormControl')?.value
    if (desiredAmount !== null) {
        this._amountService.getAmountDetail(desiredAmount).pipe(takeUntil(this._sub$)).subscribe({
          next: result => {
            if (result.floor)
              this.amountFormGroup.setValue({
                amountFormControl: result.floor.value
              });
          },
          error: (err: HttpErrorTracker) => {
            this.openSnackBar('An error occured with status ' + err.statusCode + '. ' + err.errorMessage);
          }
        });
    }
  }

  /**
   * Retrieves the plus of a given amount
   */
  getPlusAmount() {
    let desiredAmount = this.amountFormGroup.get('amountFormControl')?.value

    if (desiredAmount !== null) {
      this._amountService.getAmountDetail(desiredAmount).pipe(takeUntil(this._sub$)).subscribe({
        next: result => {
          if (result.ceil)
            this.amountFormGroup.setValue({
              amountFormControl: result.ceil.value
            });
        },
        error: (err: HttpErrorTracker) => {
          this.openSnackBar('An error occured with status ' + err.statusCode + '. ' + err.errorMessage);
        }
      });
    }
  }

  /**
   * Opens a material dialog to propose amounts
   * 
   * @param possibleCombination the amounts to display
   */
  openDialog(possibleCombination: Amount) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {amount: possibleCombination},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.amountFormGroup.setValue({
        amountFormControl: result
      });
    });
  }

  /**
   * Opens a material snackbar to display messgages
   * 
   * @param message the message to display
   */
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  ngOnDestroy() {
    this._sub$.next();
    this._sub$.complete(); 
  }

}
