import React, { useState } from 'react';
import { useContext } from 'react';
import { authcontext } from '../context/AuthContext';
export default function Login() {
    const {loginuseraction} = useContext(authcontext);
    // formdata
    const [formData,setFormData] = useState({
        email: "",
        password: "",
    });
    
    const {email,password} = formData;

    //onchange
    const onChangeInput = (e)=>
    {
        console.log(e.target.name);
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    //submit
    const onSubmitHandler = (e)=>
    {
      e.preventDefault();
      loginuseraction(formData);
    }
    //console.log(authcontext);
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 underline">
                   Sign in
                </h1>
                <form className="mt-10" onSubmit={onSubmitHandler}>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={onChangeInput}
                            value={email}
                            type="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoComplete='off'
                            placeholder='example@gmail.com'
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                             
                        >
                            Password
                        </label>
                        <input
                            onChange={onChangeInput}
                            value={password}
                            name='password'
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='********'
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-green-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600" type='submit'>
                            Login 
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/Register"
                        className="font-medium text-green-600 hover:underline"
                    >
                        Sign up
                    </a>
                     </p>
            </div>
        </div>
    );
}