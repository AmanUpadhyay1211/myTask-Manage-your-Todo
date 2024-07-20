import React,{useState,useEffect} from 'react'


  function More({ todo }) {
    const [createdAt, setCreatedAt] = useState([]);
    const [completedAt, setCompletedAt] = useState([]);
  
    useEffect(() => {
      const createdAtValues = Object.values(todo.createdAt);
      const completedAtValues = Object.values(todo.completedAt);
      setCreatedAt(createdAtValues);
      setCompletedAt(completedAtValues);
    }, [todo]);
  
  return (
   <div className={`container z-10 w-[190px] right-[10px] absolute p-2 font-bold bg-white rounded-2xl text-black bg-opacity-75 justify-center items-center flex`}>
              <div className="box flex items-center justify-center flex-col p-3 gap-2 bg-purple-500 rounded-xl text-black">
                <p>{todo.Todo}</p>
                <div className='flex gap-3'>{createdAt.map(item=>{
                  return<p key={item}>{item}</p>
                })}</div>
                 <p>Status : {todo.isCompleted ? "Completed" : "Incomplete"}</p>
               {completedAt && <div className='flex gap-3'>{completedAt.map(item=>{
                  return<p key={item}>{item}</p>
                })}</div>}
              </div>
    </div>
  )
}

export default More