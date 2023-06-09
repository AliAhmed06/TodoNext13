import React from 'react'
import { TodoItem } from './components/ServerComponents'
import { cookies } from 'next/headers';

const fetchTodo = async (token) => {
    try {
      const res = await fetch(`${process.env.URL}/api/mytask`, {
        cache: "no-cache",
        headers:{
          cookie: `token=${token}`
        }
      });
  
      const data = await res.json();
  
      if(!data.success) return [];
  
      return data.tasks;
    } catch (error) {
      return [];
    }
}
  

const Todos = async () => {
    const token = cookies().get("token")?.value;
  
    // if(!token){
    //     return redirect("/login");
    // }
    const tasks = await fetchTodo(token);
  
    return (
    <section className='w-[40%] mx-auto' >
        {
          tasks?.map((i) => (
            <TodoItem 
              key={i._id}  
              id={i._id}
              title={i.title} 
              description={i.description} 
              completed={i.isCompleted}
            />
          ))
        }
    </section>
  )
}

export default Todos