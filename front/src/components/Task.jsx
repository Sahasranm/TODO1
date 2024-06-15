import React, { useEffect, useState } from 'react';
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import axios from 'axios'
import '../App.css';
const Task = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos,setCompletedTodos] = useState([]);
  const [currentEdit,setcurrentEdit]= useState("");
  const [currentEditedItem,setcurrentEditedItem] =useState("");
  const [task,setTask]=useState()
const [description,setDescription]=useState()
  const handleAddTodo = () => {
        axios.post('http://localhost:3000/todo',{task,description}).then(result=>console.log(result))
        .catch(err=>console.log(err))
  };

  const handleDeleteTodo = (id) =>{
    let reducedTodo =[...Todos];
    axios.delete(`http://localhost:3000/todo/${id}`).then(result=>{console.log(result)
        console.log(id)
    })
    .catch(err=>console.log(err))
  };
 
  const handleComplete = index =>{
    let now = new Date();
    let dd=now.getDate();
    let mm= now.getMonth() +1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' +s;

    let filteredItem = {
         ...Todos[index],
         completedOn :  completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(Todos[index]._id);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = index => {
    let reducedTodo =[...completedTodos];
    reducedTodo.splice(Todos[index]._id);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  //used whenever new page is rendered{
  //checking whether locastorage has item or not

useEffect(()=>{
    axios.get("http://localhost:3000/todo").then(result=>setTodos(result.data))
})
  const handleEdit = (ind,item)=>{
    
    setcurrentEdit(ind);
    setcurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
     setcurrentEditedItem((prev)=>{
      return {...prev,title:value}
     
     })
  }

  const handleUpdateDescription = (value)=>{
    setcurrentEditedItem((prev)=>{
      return {...prev,description:value}
    
     })
  }
  
  const handleUpdateToDo = (id) => {
    axios.put(`http://localhost:3000/todo/${id}`, { task: currentEditedItem.title, description: currentEditedItem.description })
      .then(res => {
        console.log('Todo updated successfully:', res.data);
        
        const updatedTodos = Todos.map(todo => {
          if (todo._id === res.data._id) {
            return res.data; 
          }
          return todo; 
        });
        setTodos(updatedTodos);
        setcurrentEdit(-1); 
      })
      .catch(err => console.error('Error updating todo:', err));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text'  onChange={(e) => setTask(e.target.value)} placeholder="What is your Task title?" />

          </div>
      

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text'  onChange={(e) => setDescription(e.target.value)} placeholder="What is the Description ?" />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>

        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isCompleteScreen===false && Todos.map((item, index) => {
           if(currentEdit===index){
            return(
               <div className='edit__wrapper' key={index}>
              <input placeholder='Updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}/>
              <textarea placeholder='Updated Title' rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description}/>
              <button type="button" onClick={()=>handleUpdateToDo(item._id)} className='primaryBtn'>Update</button>
              </div>
            )
           } 
           else
           {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h1>{item.task}</h1>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(item._id) } title='delete?'/>
                  <BsCheck className='check-icon' onClick={()=>handleComplete(index)}/>
                  <AiOutlineEdit className='check-icon' onClick={()=>handleEdit(index,item) } title='Edit?'/>
                </div>
              </div>
            )
           }
          })}

          {isCompleteScreen===true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                
                  <h1>{item.task}</h1>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>

                </div><BsCheck className='icon' onClick={() => handleDeleteCompletedTodo(item._id)}  />
                
                              </div>
            )
          })}



        </div>
      </div>
    </div>
  )
}

export default Task
