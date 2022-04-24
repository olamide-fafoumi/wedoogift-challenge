import { IAmountDetail } from "./amount-detail";

export class Amount {
    
    constructor(public equal: IAmountDetail,
                public floor: IAmountDetail,
                public ceil: IAmountDetail
    ) {  }

}