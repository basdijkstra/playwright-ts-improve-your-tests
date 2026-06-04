import { LoanApplication } from "./loanApplicationType";

export class LoanApplicationBuilder {

    private readonly loanApplication: LoanApplication = {} as LoanApplication;

    private constructor() {}

    static create(): LoanApplicationBuilder {
        return new LoanApplicationBuilder();
    }

    static createWithDefaults(): LoanApplicationBuilder {
        return LoanApplicationBuilder.create()
        .withAmount(1000)
        .withDownPayment(100)
        .withFromAccountId(12345);
    }

    build(): LoanApplication {
        return this.loanApplication;
    }

    withAmount(amount: number): LoanApplicationBuilder {
        this.loanApplication.amount = amount;
        return this;
    }

    withDownPayment(downPayment: number): LoanApplicationBuilder {
        this.loanApplication.downPayment = downPayment;
        return this;
    }

    withFromAccountId(fromAccountId: number): LoanApplicationBuilder {
        this.loanApplication.fromAccountId = fromAccountId;
        return this;
    }
}