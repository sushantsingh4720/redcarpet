import { React, useState, useEffect } from "react";

const List = ({name, user}) => {
    const [state, setState] = useState(0);
    const [taskname, setTaskName] = useState('');
    const [detail, setDetail] = useState('');
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    
    const editTask = () =>{
        setTaskName(task.name);
        setDetail(task.detail);
        setState(1);
    }

    const fetchTasks = async () =>{
        const response = await fetch('http://localhost:5000/api/lists/',  {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const result = await response.json();
        setTasks(result);
    }
    const createTask = async () =>{
        const data = {name: taskname, detail};
        const response = await fetch('http://localhost:5000/api/lists/',  {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });
        await fetchTasks();
    }
    const saveTask = async () =>{
        setTasks([...tasks, {name: taskname, detail}]);
        await createTask();
        setState(0);
    }

    const deleteTask = async() =>{
        const response = await fetch(`http://localhost:5000/api/lists/${task._id}`,  {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
        });
        const result = await response.json();
        if(result.id) setState(0);
        await fetchTasks();
        
        // console.log(result);
    }
    useEffect(()=>{
        fetchTasks();
    }, [])
    return (
        <div className="list">
            <div className="container space-bet list-head">
                <div>{name}</div>
                <div className="dots">⁝</div>
            </div>
            <div className="container row">
                <div className="add-btn" onClick={()=>{
                    setDetail('');
                    setTaskName('');
                    setState(1);
                    }}>+</div>
                <div> Add a task</div>
            </div>
            {
                tasks.map((task)=>{
                    return(
                        <div className="container task row" key={task.name} onClick={(e)=>{
                            setTask(task);
                            editTask()}}>
                            <div><input type='checkbox' className="task-checkbox" onClick={(e)=>{
                                setTask(task);
                                deleteTask();}}/></div>
                            <div>{task.name}</div>
                        </div>
                    )
                })
            }


            {
                state === 1 && 
                <div className="new-task-popup">
                    <div className="popup">
                    <div className="container space-bet">
                        <div className="bin" onClick={(e) => deleteTask()}>🗑</div>
                        <div className="dots" onClick={(e)=>{setState(0)}}>❌</div>
                    </div>
                    <div>
                    <input type="text" placeholder="Task Name" className="task-input" onChange={(e)=>{setTaskName(e.target.value)}} id="task-name" defaultValue={taskname}/></div>
                    <div><textarea placeholder="Add details" className="task-input task-detail" onChange={(e)=>{setDetail(e.target.value)}} id="task-detail" defaultValue={detail}></textarea></div>
                    {/* <div><input type="date" className="task-input"/></div> */}
                    <button className="btn" onClick={(e)=> saveTask()}>Save</button> 
                    </div>
                </div>
            }
        </div>
    )
}
export default List;