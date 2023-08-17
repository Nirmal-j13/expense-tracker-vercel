import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authcontext } from '../context/AuthContext';

export default function Register() {

    const {reguseraction} = useContext(authcontext);
     
    const [formData,SetFormData] = useState(
        {
            fullname:'',
            email:'',
            password:'',
        }
    );
    const {fullname,email,password} = formData;

    //onchange
    const onChangeInput = (e)=>{
        SetFormData(
            {...formData,[e.target.name]:[e.target.value]}
        )
    };
    //handlesubmit
    const onSubmithandler = (e)=>{
        e.preventDefault();
        reguseraction(formData);
    }
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 underline">
                   Sign Up
                </h1>
                <form className="mt-6" onSubmit={onSubmithandler}>
                   <div className="mb-2">
                        <label
                            for="fullname"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            FullName
                        </label>
                        <input
                            name='fullname'
                            value={fullname}
                            onChange={onChangeInput}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoComplete='off'
                            placeholder='FullName'
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            name='email'
                            value={email}
                            onChange={onChangeInput}
                            type="email"
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
                            name='password'
                            value={password}
                            onChange={onChangeInput}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='********'

                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                         type='submit'>
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                     Have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-green-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}