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
        setState(2);
    }

    const fetchTasks = async () =>{
        const response = await fetch('https://red-carpet-mern.herokuapp.com/api/lists/',  {
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
        const response = await fetch('https://red-carpet-mern.herokuapp.com/api/lists/',  {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });
        // await fetchTasks();
    }
    const saveTask = async () =>{
        setTasks([...tasks, {name: taskname, detail}]);
        setState(0);
        await createTask();
    }

    const deleteTask = async() =>{
        const response = await fetch(`https://red-carpet-mern.herokuapp.com/api/lists/${task._id}`,  {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
        });
        const result = await response.json();
        if(result._id) setState(0);
        await fetchTasks();
        
        // console.log(result);
    }

    const updateTask = async() =>{
        const data= {name: taskname, detail};
        // console.log(task);
        const response = await fetch(`https://red-carpet-mern.herokuapp.com/api/lists/${task._id}`,  {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });
        setState(0);
        const result = await response.json();
        console.log(result);
        if(result._id) await fetchTasks();
        
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
                        <div className="container task row" key={task.name} >
                            <div><input type='checkbox' className="task-checkbox" onClick={(e)=>{
                                setTask(task);
                                deleteTask();}}/></div>
                            <div>{task.name}</div>
                            <div className="edit" onClick={(e)=>{
                            setTask(task);
                            editTask()}}>🖊</div>
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
            {
                state === 2 && 
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
                    <button className="btn" onClick={(e)=> updateTask()}>Update</button> 
                    </div>
                </div>
            }
        </div>
    )
}
export default List;