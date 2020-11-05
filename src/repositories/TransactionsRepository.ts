import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}


interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const {income, outcome} = this.transactions.reduce((acumulate: Balance, transaction: Transaction) => {
      switch (transaction.type) {
        case "income":
          acumulate.income += transaction.value;
          break;
        case "outcome":
          acumulate.outcome += transaction.value;
        default:
          break;
      }

      return acumulate;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    },
    );

    const total = income - outcome;

    return {income, outcome, total};
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    // TODO
    const transaction = new Transaction({
      title,
      value,
      type
    })

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
