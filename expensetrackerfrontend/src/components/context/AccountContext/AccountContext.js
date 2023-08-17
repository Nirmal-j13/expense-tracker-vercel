import  { createContext,useReducer } from 'react';
import { API_ACCOUNT_URL } from '../../../utils/apiURL';
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCESS, ACCOUNT_DETAILS_FAIL,
         ACCOUNT_DETAILS_SUCCESS } from './AccountActionType';
import axios, { formToJSON } from 'axios';  
export const accountContext = createContext()
//initial state

const INITIAL_STATE = {
    userAuth:JSON.parse(localStorage.getItem('userAuth')),
    account: null,
    accounts:[],
    loading:false,
    error:null,
};

//reducer
const accountReducer = (state,action)=>{
  const {type,payload} = action;
  switch(type)
  {
    case ACCOUNT_DETAILS_SUCCESS:
         return{
           ...state,
           account:payload,
           loading:false,
           error:null
         }
    case ACCOUNT_DETAILS_FAIL:
        return{
            ...state,
            account:null,
            loading:false,
            error:payload
          }
          case ACCOUNT_CREATION_SUCCESS:
            return{
              ...state,
              account:payload,
              loading:false,
              error:null
            }
       case ACCOUNT_CREATION_FAIL:
           return{
               ...state,
               account:null,
               loading:false,
               error:payload
             }
     default: 
          return state
  }
};

//provider
export const AccountContextProvider = ({children})=>{
const [state,dispatch]= useReducer(accountReducer,INITIAL_STATE)
// Get account Details actions
//console.log(state)
const getAccountDetailsAction = async (id)=>{

    const config = {
        headers :{
            Authorization:`Bearer ${state?.userAuth?.token}`,
            "ContentType":"application/json",
        },
    };
    try {
      const res= await axios.get(`${API_ACCOUNT_URL}/${id}`,config);
      //dispatch
      if(res?.data?.status==='success')
      {
        dispatch({
            type:ACCOUNT_DETAILS_SUCCESS,
            payload:res?.data
          })
      }
      console.log(res);
    } catch (error) {
        dispatch({
            type:ACCOUNT_DETAILS_FAIL,
            payload:error?.data?.response?.message
          })
    }
}
const createAccountAction = async (formData)=>{

    const config = {
        headers :{
            Authorization:`Bearer ${state?.userAuth?.token}`,
            "ContentType":"application/json",
        },
    };
    try {
      const res= await axios.post(`${API_ACCOUNT_URL}`,formData,config);
      //dispatch
      if(res?.data?.status==='Success')
      {
        dispatch({
            type:ACCOUNT_CREATION_SUCCESS,
            payload:res?.data
          })
      }
      console.log(res);

    } catch (error) {
        dispatch({
            type:ACCOUNT_CREATION_FAIL,
            payload:error?.data?.response?.message
          })
          //console.log(error)
    }
}
  return <accountContext.Provider
         value={{getAccountDetailsAction,
                 account:state?.account,
                 createAccountAction,
                 error:state?.error
                }}
         >
      {children}
  </accountContext.Provider>
}

