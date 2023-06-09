"use client";

import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { Context } from '../components/Clients';
import {redirect} from 'next/navigation'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return alert(data.message);
      setUser(data.user);
      alert(data.message);
    } catch (error) {
      return alert(error);
    }
  };

  if(user._id){
    return redirect("/");
  }

  return (
    <div className='flex items-center justify-center'>
        <form onSubmit={loginHandler} className='w-[40%] flex items-center justify-center flex-col gap-5 p-10'>
            <input 
                type="text" 
                placeholder='Enter Email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outline-none border border-gray-200 py-2 px-5 w-full'
            />
            <input 
                type="password" 
                placeholder='Enter Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outline-none border border-gray-200 py-2 px-5 w-full'
            />
            <button 
                type='submit'
                className='bg-black text-white w-[200px] py-2 uppercase'
            >Login</button>

            <p>OR</p>

            <Link href='/register'>New User</Link>
        </form>
    </div>
  )
}




export default Login