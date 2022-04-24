import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AmountService } from './amount.service';

describe('AmountService', () => {

  let httpTestingController : HttpTestingController
  let amountService: AmountService;

  const mockReturn = {
    "ceil": {
      "value": 20,
      "cards": [20]
    }
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AmountService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    amountService = TestBed.inject(AmountService);
  });

  it('should be created', () => {
    expect(amountService).toBeTruthy();
  });

  it('should call the good url', () => {
    amountService.getAmountDetail(0).subscribe();

    httpTestingController.expectOne('http://localhost:3000/shop/5/search-combination?amount=0');

    httpTestingController.verify();
  })

  it('should receive data from GET call', () => {
    amountService.getAmountDetail(0).subscribe( amount => {
      expect(amount.ceil).toBeTruthy();
      expect(amount.ceil?.cards).toEqual([20])
      expect(amount.equal).toBeFalsy(); 
      expect(amount.floor).toBeFalsy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/shop/5/search-combination?amount=0'); 
    
    req.flush(mockReturn);

    expect(req.request.method).toBe('GET');

    httpTestingController.verify();
  })
});
