import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
}

/*interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}*/

  type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; // exclui oq vc n quer

 // type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

 interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
 }

interface TransactionProviderProps {
    children: ReactNode
}

const TransactionContext = createContext<TransactionsContextData>(
     {} as TransactionsContextData
    );

export function TransactionsProvider({ children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
          api.get('transactions')
          .then(response => setTransactions(response.data.transactions))
      }, []);

     async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', transactionInput)
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
      }

      return (
         <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children} 
         </TransactionContext.Provider>
      );
}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}