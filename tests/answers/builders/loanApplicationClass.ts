export class LoanApplication {

    readonly amount: number;
    readonly downPayment: number;
    readonly fromAccountId: number;

    constructor({ amount, downPayment, fromAccountId } : { amount?: number, downPayment?: number, fromAccountId?: number} ) {
        this.amount = amount ?? 1000;
        this.downPayment = downPayment ?? 100;
        this.fromAccountId = fromAccountId ?? 12345;
    }
}