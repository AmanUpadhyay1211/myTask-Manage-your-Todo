import { useState,useRef,useEffect } from 'react'
import Navbar from  './components/Navbar';
import More from './components/More';
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io"
import { IoMdClose } from "react-icons/io";

function App() {

  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  const input = useRef()


  useEffect(() => {
    let TodoString = localStorage.getItem("Todos")
    if(TodoString){
      let Todos = JSON.parse(localStorage.getItem("Todos")) 
      setTodos(Todos)
    }
  }, [])

  const saveTodoLS = ()=>{
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  function getCurrentDateTime() {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const time = `${now.getHours()}-${now.getMinutes()}`;
    return {
        Date: date,
        Time: time
    };}

  const handleShowFinished = ()=>{
    setshowFinished(!showFinished)
  }
  const handleChange = (e)=>{
       setTodo(e.target.value);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();

    }
  };
  const handleSave = ()=>{
       setTodos([...Todos,{id:uuidv4(),Todo,isCompleted:false,createdAt:getCurrentDateTime(),completedAt:"",display:false}])
       setTodo('')
       saveTodoLS();
       input.current.focus()    
  }
  const handleDelete = (id)=>{
      let newTodos = Todos.filter((todo)=> todo.id !== id )
      setTodos(newTodos)
      saveTodoLS();
     // console.log(newTodos)
  }
  const handleEdit = (id) => {
     let edit = Todos.filter((todo)=> todo.id === id )
     setTodo(edit[0].Todo)
     input.current.focus()
     let newTodos = Todos.filter((todo)=> todo.id !== id )
    setTodos(newTodos)
    saveTodoLS();
}

  const todoCheak = (e,id)=>{
     let index = Todos.findIndex((item)=> item.id===id);
   let newTodos =  [...Todos];
   newTodos[index].isCompleted =  !newTodos[index].isCompleted ;
   if(newTodos[index].isCompleted){
   newTodos[index].completedAt =  getCurrentDateTime()}
   setTodos(newTodos)
   saveTodoLS();
}

const todoInfo = (e,id)=>{
  const index = Todos.findIndex((item) => item.id === id);  
  const updatedTodo = { ...Todos[index], display: !Todos[index].display  };
  const updatedTodos = [...Todos.slice(0, index), updatedTodo, ...Todos.slice(index + 1)];
  setTodos(updatedTodos);
  saveTodoLS();
}

  return (
    <>
    <div className="body flex flex-col gap-5">
     <Navbar/>


     <div className="container w-screen sm:w-[70vw] sm:mx-auto bg-pink-200 h-[85vh] text-black rounded-xl">
         <div className="heading text-2xl w-[100%] flex sm:flex-row flex-col justify-center items-center gap-1 sm:gap-0 font-bold my-5"><span>myTask </span> <span className='sm:inline hidden'> : </span> <span> Manage your Todo At one Place</span></div>
          
          <div className="addTodo px-5 mt-6 mb-3">
            <h2 className='font-bold text-xl'>Add a Todo</h2>
            <div className="inputSec my-2 text-black h-10 flex">
              <input placeholder='Write Your Todo...' className='rounded-l-2xl h-[100%] w-[90%] outline-none text-lg pl-3' ref={input}  type="text" name="todo" id="todo" onKeyDown={handleKeyPress} value={Todo} onChange={handleChange}/>
              <button disabled={Todo.length<=3} className='bg-purple-700 disabled:bg-slate-500 hover:bg-purple-900 py-1 px-3 text-white h-[100%] rounded-r-2xl font-bold'  onClick={handleSave}>Save</button> 
            </div>
          </div>

          <div className="TodoList px-5">
            <label htmlFor="" className='font-bold flex gap-2 mt-10 mb-2'><input type="checkbox" checked={showFinished} onChange={handleShowFinished}  name="showFinished" id="showFinished" />Show Finished</label>
            <div className='border-[0.5px] border-opacity-50 border-black w-[50%]'></div>
            <h2 className='mt-4 mb-2 font-bold text-xl'>Your Todos</h2>

           
            <div className='TodoList flex flex-col gap-3 h-[40vh] overflow-auto'>
              {Todos.map((item)=>{
                if(showFinished || item.isCompleted===false){
                   return ( <div key={item.id} className="flex relative justify-between">
                    <div className="right flex gap-2">
                   <input type="checkbox" checked={item.isCompleted} onChange={(e)=>{todoCheak(e,item.id)}}  name="" id="" />
                   <div className={item.isCompleted ? 'line-through' : ''}>{item.Todo}</div>
                 </div>
                 <div className="left flex gap-2">
                    <div onClick={()=>handleEdit(item.id)} className='bg-purple-700 hover:bg-purple-900 py-1 px-2 rounded text-white' ><FaEdit /></div> 
                   <div onClick={()=>handleDelete(item.id)} className='bg-purple-700 hover:bg-purple-900 py-1 px-2 rounded text-white'><MdDelete /></div>

                   {!item.display &&  <div onClick={(e)=>todoInfo(e,item.id)} className='bg-purple-700 hover:bg-purple-900 py-1 px-2 rounded text-white'><IoMdMore/>  </div>}
                  {item.display && <div onClick={(e)=>todoInfo(e,item.id)} className='bg-purple-700 hover:bg-purple-900 py-1 px-2 rounded text-white'><IoMdClose /> 
                  {item.display && <More todo={item} /> }  
                   </div>}
                 </div>
                 </div>)}
              })}</div>
          </div>
     </div> 
     {/* <Fotter/> */}
    </div>
    </>
  )
}

export default App

