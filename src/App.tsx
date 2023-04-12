import React, { useState } from 'react'
import Modal from 'react-modal';
import {Dashboard} from './components/Dashboard'
import {Header} from './components/Header'
import NewTransacionModal from './components/NewTransactionsModal';
import { TransactionsProvider} from './hooks/useTransactions';
import { GlobalStyle } from './styles/Global'

Modal.setAppElement('#root')

function App() {
  const [isNewTransactionModalOpen, setNewTransactionModalopen] = useState(false);

  function handleOpenNewTransactionModal() {
    setNewTransactionModalopen(true);
    
  }

  function handleCloseNewTransactionModal() {
    setNewTransactionModalopen(false);
    
  }
  return (
   <TransactionsProvider>

   <Header onOpenNewTransactionModal={
    handleOpenNewTransactionModal
   } />
   <Dashboard/>
  <NewTransacionModal
    isOpen={isNewTransactionModalOpen}
    onRequestClose={handleCloseNewTransactionModal}
  />
  
   <GlobalStyle/>
   </TransactionsProvider>
  )
}

export default App
