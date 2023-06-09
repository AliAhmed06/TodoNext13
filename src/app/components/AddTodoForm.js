"use client";

import { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Context } from "./Clients";
import { User } from "../../../models/user";

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {user} = useContext(Context);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/newtask",{
        method:"POST",
        body: JSON.stringify({
          title, description
        }),
        headers:{
          "Content-Type": "application/json"
        },
      })

      const data = await res.json();

      if(!data.success) return alert(data.message);

      alert(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      return alert(error);
    }
  }

  if(!user._id) return redirect("/login");

  return (
    <div className='flex items-center justify-center '>
      <form onSubmit={submitHandler} className='w-[40%] flex items-center justify-center flex-col gap-5 p-10 bg-gray-300 mt-20'>
          <input 
              type="text" 
              placeholder='Task Title' 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='outline-none border border-gray-200 py-2 px-5 w-full'
          />
          <input 
              type="text" 
              placeholder='Task Description' 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='outline-none border border-gray-200 py-2 px-5 w-full'
          />
          <button 
              type='submit'
              className='bg-black text-white w-[200px] py-2 uppercase'              
          >Add Task</button>
      </form>
    </div>
  )
}

export default AddTodoForm