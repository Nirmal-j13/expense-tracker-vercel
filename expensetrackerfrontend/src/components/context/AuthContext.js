import { createContext,useReducer} from "react";
import axios, { Axios } from "axios";
import { LOGIN_SUCCESS ,LOGIN_FAILED ,FETCH_PROFILE_SUCCESS,FETCH_PROFILE_FAILED,LOGOUT,REGISTER_SUCCESS,REGISTER_FAILED} from "./AuthActionType";
import { json } from "react-router-dom";
import { API_USER_URL } from "../../utils/apiURL";
//auth context
export const authcontext=createContext();

//initial state
const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem('userAuth')),
    error:null,
    loading:false,
    profile:null,
};

//Authreducer
const reducer = (state,action)=>{
   //console.log(action);
   const {type,payload} = action;

    switch(type)
    {
        case REGISTER_SUCCESS:
           // localStorage.setItem('userAuth',JSON.stringify(payload)); 
              return {
                 ...state,
                 error:null,
                 loading:false,
                 userAuth:payload,
              };
        case REGISTER_FAILED: 
              return {
                 ...state,
                 error:payload,
                 loading:false,
                 userAuth: null,
              }; 
    //Add User to local storage
        case LOGIN_SUCCESS:
            localStorage.setItem('userAuth',JSON.stringify(payload)); 
              return {
                 ...state,
                 error:null,
                 loading:false,
                 userAuth:payload,
              };
        case LOGIN_FAILED: 
              return {
                 ...state,
                 error:payload,
                 loading:false,
                 userAuth: null,
              }; 
    //profile
        case FETCH_PROFILE_SUCCESS:
               return{
                ...state,
                loading:false,
                error:null,
                profile:payload
               };
        case FETCH_PROFILE_FAILED:
                return{
                 ...state,
                 loading:false,
                 error:payload,
                 profile:null
                };
        case LOGOUT:
            localStorage.removeItem('userAuth');
            return{
                ...state,
                loading:false,
                error:null,
                userAuth:null
               };
        default:
              return state; 
    }
}

//Provider
 export const AuthContextProvider =({children})=>{
 const [state,dispatch]   = useReducer(reducer ,INITIAL_STATE);
 
 //login action
  const loginuseraction = async(formData)=>{
    const config = {
        headers:{
            'Content-Type':"application/json"
        },
    };
     try{
     const res = await axios.post(`${API_USER_URL}/login`,formData,config);
      if(res?.data?.status === 'success')
      {
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data,
        });
      }
      window.location.href='/dashboard'
      //console.log(res);
     }
     catch(err)
     {
        dispatch({
            type:LOGIN_FAILED,
            payload: err?.response?.data?.message,
        })
     }
  }

  //profile action
  const fetchprofileaction =async()=>
  {
    
    try{
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization :`Bearer ${state?.userAuth?.token}`,
            }
        };
        
            const res=await axios.get(`${API_USER_URL}/profile`,config);
          
            if(res?.data)
            {
                dispatch( 
                    {
                        type: FETCH_PROFILE_SUCCESS,
                        payload:res.data,
                    }
                );
            }
            console.log(res); 
    }
    catch(error){
        dispatch(
            {
               type: FETCH_PROFILE_FAILED,
               payload:error?.response?.data?.message
            }
        )
    }
  }

  //logout action
   const logoutuseraction = ()=>{
    dispatch({
        type:LOGOUT,
        payload:null
    })
    window.location.href='/login';
   }

 //login action
 const reguseraction = async(formData)=>
 {
    console.log("hello");
    const config = {
        headers:{
            'Content-Type':"application/json"
        },
    };
     try{
     const res = await axios.post(`${API_USER_URL}/register`,formData,config);
     console.log(API_USER_URL);
      if(res?.data?.status === 'Success')
      {
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data,
        });
      }
      window.location.href='/login';
      //console.log(res);
     }
     catch(err)
     {
        dispatch({
            type:REGISTER_FAILED,
            payload: err?.response?.data?.message,
        })
     }
  }
   return <authcontext.Provider value={{
    loginuseraction,
    userAuth: state,
    token:state?.userAuth?.token,
    fetchprofileaction,
    profile: state?.profile,
    error:state?.error,
    logoutuseraction,
    reguseraction,
   }}>
      {children}
   </authcontext.Provider>
}