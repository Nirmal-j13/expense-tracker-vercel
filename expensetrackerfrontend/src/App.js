import { BrowserRouter,Routes,Route, HashRouter } from 'react-router-dom'; 
import './App.css';
import HomePage from './components/HomePage';
import AddTransaction from './components/AddTransaction';
import TransactionContext  from './components/context/TransactionContext/TransactionsContext';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import AccountDashboard from './components/Dahboard/AccountDashboard'
import AccountDetails from './components/Dahboard/AccountDetails';
import AddAccount from './components/AddAccount';
import '@chatscope/chat-ui-kit-react'
import { useState } from 'react';
import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { BankyBot } from './components/BankyBot/BankyBot';
function App() {

  return (
    <div className="App">
     <HashRouter>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/BankyBot' element={<BankyBot/>}/>
         <Route path='/add-transaction/:id' element={<AddTransaction/>}/>
         <Route path='/dashboard' element={<AccountDashboard/>}/>
         <Route path='/account-details/:accountID' element={<AccountDetails/>}/>
         <Route path='/dashboard/add-account' element={<AddAccount/>}/>
       </Routes>
     </HashRouter>
    </div>
  );
}

export default App;
