import { useEffect, useState } from 'react'
import Task from './Task'

function App() {

  const [tasks,setTasks] = useState([])
  const [newTask,setNewTask] = useState("")

  const [listType,setListType] = useState("total")
  const handleChangeListType = (type) => {
    setListType(type)
  }

  const handleCreateInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleUpdateTasks = (type,index) => {
    switch (type) {
      case "create":{
        const content = newTask.trim()
        if (content === "") {
          return
        }
        const createNewTask = {
          content,
          completed: false,
          pinned: false
        }
        const newTasks = [...tasks,createNewTask]
        handleSaveTasksData(newTasks)
        setNewTask("")}
        break;
      
      case "pinned"   :
      case "completed":{
        const newTasks = [...tasks]
        newTasks[index][type] = !newTasks[index][type]
        handleSaveTasksData(newTasks)}
        break;

      case "delete":{
        const newTasks = tasks.filter((_,i)=> i !== index)
        handleSaveTasksData(newTasks)}
        break;
      
      case "deleteAll":{
        handleSaveTasksData([])}
        break;
    
      default:
        break;
    }
  }

  const handleSaveTasksData = (newTasks) => {
    setTasks(newTasks)
    const tasksData = JSON.stringify(newTasks)
    localStorage.setItem("ToDo",tasksData)
  }

  useEffect(()=>{
    const defaultData = JSON.parse(localStorage.getItem("ToDo"))
    setTasks(defaultData)
  },[])
  
  return (
    <div className='container text-center mt-3'>
      <h1 className="mb-3">ToDo List</h1>

      <div className='w-50 mx-auto d-flex mb-3'>
        <input
          type="text" placeholder='請輸入代辦事項...'
          value={newTask}
          className='form-control' 
          onChange={(e)=>handleCreateInputChange(e)}
        />
        <button
          className='btn btn-primary flex-shrink-0 ms-2'
          onClick={()=>handleUpdateTasks("create")}
        >
          新增
        </button>
      </div>

      { tasks.length > 0 ? (<>
        <div className="w-50 mx-auto position-relative">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${listType === "total" ? "active fw-bold" : "text-secondary"}`}
                onClick={()=>handleChangeListType("total")}
              >
                全部
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${listType === "completed" ? "active fw-bold" : "text-secondary"}`}
                onClick={()=>handleChangeListType("completed")}
              >
                已完成
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${listType === "uncompleted" ? "active fw-bold" : "text-secondary"}`}
                onClick={()=>handleChangeListType("uncompleted")}
              >
                未完成
              </button>
            </li>
          </ul>
          { tasks.length > 1 && listType === "total" && (
            <button
              className='position-absolute top-0 end-0 btn btn-danger'
              onClick={()=>handleUpdateTasks("deleteAll")}
            >
              全部刪除
            </button> )}
        </div>
        <div className="w-50 mx-auto border border-top-0 rounded-bottom text-start p-1">
          <ul className="list-unstyled task-list mb-0">
            { tasks.map((task,index)=>{
              if (task.pinned) {
                if (listType !== "total") {
                  let isCompleted
  
                  switch (listType) {
                    case "completed":
                      isCompleted = true
                      break;
  
                    case "uncompleted":
                      isCompleted = false
                      break;
                  
                    default:
                      break;
                  }
                  
                  if (task.completed !== isCompleted) {
                    return
                  }
                }
                
                return ( <Task key={index} task={task} index={index} handleUpdateTasks={handleUpdateTasks} /> )
              }
            }) }

            { tasks.map((task,index)=>{
              if (listType !== "total") {
                let isCompleted

                switch (listType) {
                  case "completed":
                    isCompleted = true
                    break;

                  case "uncompleted":
                    isCompleted = false
                    break;
                
                  default:
                    break;
                }
                
                if (task.completed !== isCompleted) {
                  return
                }
              }

              if (task.pinned) {
                return
              }

              return ( <Task key={index} task={task} index={index} handleUpdateTasks={handleUpdateTasks} /> )
            }) }
          </ul>
        </div>
      </>) : (<h3>立刻開始建立清單吧~</h3>) }
    </div>
  )
}

export default App
