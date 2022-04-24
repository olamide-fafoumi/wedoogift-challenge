import { IAmountDetail } from './../../models/amount-detail';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-desired-amount-detail',
  templateUrl: './desired-amount-detail.component.html',
  styleUrls: ['./desired-amount-detail.component.scss']
})
export class DesiredAmountDetailComponent implements OnInit {

  @Input()
  cardCombinations = {} as IAmountDetail;

  constructor() {}

  ngOnInit() {}

}
