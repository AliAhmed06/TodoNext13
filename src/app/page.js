import React, { Suspense } from 'react'
import AddTodoForm from './components/AddTodoForm'
import Todos from './todos';


function Home() {
  
  return (
    <div className=''>
      <AddTodoForm />

      <Suspense fallback={ <div>loading...</div> }>
        <Todos />
      </Suspense>      
    </div>
  )
}

export default Home