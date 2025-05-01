export default function Task ({task,index,handleUpdateTasks}) {
  return (
    <li className={`d-flex align-items-center justify-content-between border rounded`}>
      <div className="d-flex align-items-center">
        <button
          className={`btn ${task.completed ? "btn-success" : "border rounded"} me-2`}
          onClick={()=>handleUpdateTasks("completed",index)}
        >
          <i className="bi bi-check" />
        </button>
        <p>{task.content}</p>
      </div>
      <div>
        <button
          className='btn btn-warning me-2'
          onClick={()=>handleUpdateTasks("pinned",index)}
        >
          <i className={`bi ${task.pinned ? "bi-pin-fill": "bi-pin-angle"}`}></i>
        </button>
        <button
          className='btn btn-danger'
          onClick={()=>handleUpdateTasks("delete",index)}
        >
          刪除
        </button>
      </div>
    </li>
  )
}