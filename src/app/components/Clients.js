"use client";

import Link from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useRouter } from "next/navigation";

export const Context = createContext({user:{}});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
      fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if(data.success) setUser(data.user)
      });    
    }, [])

    async function getData(){
        const res = await fetch("/api/auth/me",{
            method:"GET",            
            headers:{
              "Content-Type": "application/json"
            },
          });
        // .then((res) => res.json())
        // .then((data) => {
        //     if(data.success) setUser(data.user)
        // });
        console.log(res);
    }
    // The above hook is for keeping the data of logged in user while after refreshing the page  
    return <Context.Provider
        value={{
            user,
            setUser
        }}
    >
        {children}
        <Toaster />
    </Context.Provider>
}


export const LogoutButton = () => {
    const {user, setUser} = useContext(Context);

    const logoutHandler = async () => {
        try {
            const res = await fetch("/api/auth/logout");

            const data = await res.json();

            if(!data.success){
                return alert(data.message);
            }

            setUser({});
            alert(data.message);
        } catch (error) {
            alert(error);
        }
    }

    return (
        
        user._id ? (
            <button
                className="uppercase py-3 px-5 inline-block hover:bg-white hover:text-black"
                onClick={logoutHandler}

            >Logout</button>
        ) : (
            <Link href="/login" className='uppercase py-3 px-5 inline-block hover:bg-white hover:text-black'>Login</Link>
        )        
    )
}


export const TodoButton = ({id, completed}) => {
    const router = useRouter();
    const deleteHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`,{
                method: "DELETE",

            })
            const data = await res.json();
            if(!data.success) return alert(data.message);

            alert(data.message);
            router.refresh();
        } 
        catch (error) {
            return alert(error);
        }
    }

    const updateHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`,{
                method: "PUT",
            })
            const data = await res.json();
            if(!data.success) return alert(data.message);

            alert(data.message);
            router.refresh();
        } 
        catch (error) {
            return alert(error);
        }
    }

    return <div className="space-x-5">
        <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => updateHandler(id)}
            className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black  focus:ring-2 "
        />
        <button 
            className="bg-black text-white py-1 px-5"
            onClick={() => deleteHandler(id)}
        >Delete</button>
    </div>;
}