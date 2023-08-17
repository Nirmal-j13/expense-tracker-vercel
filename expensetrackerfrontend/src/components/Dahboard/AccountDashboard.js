import AccountSummary from './AccountSummary';
import AccountList from './AccountList';
import { authcontext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
const AccountDashboard = () => {
  const {fetchprofileaction,profile,error} = useContext(authcontext);
 
  //dispatch action
  useEffect(()=>{
    fetchprofileaction();
  },[]);
 console.log(profile?.user.accounts);
  return (
    <>
     {error ? <>
      <div
        className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >

        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ">Token Expired/please login</span>
      </div>
     </>:<>
      <AccountSummary/>
      <AccountList accounts={profile?.user.accounts}/>
      </>
      }
      
    </>
  );
};

export default AccountDashboard;
