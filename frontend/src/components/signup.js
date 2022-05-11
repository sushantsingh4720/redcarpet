import {React, useState} from "react";

const Signup = ({setUser, setState})=>{
    const [name, setName] = useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');

    const signUp = async () =>{
        const data = {name, email, password};
        const response = await fetch('http://localhost:5000/api/users/',  {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        const result = await response.json();
        setUser(result);
        if(result && result.token) setState(2);
    }
    return (
        <div className="flex-wrapper">
        <div className='signup'>
        <div>
            <h1>Sign up</h1></div>
            <input type='text' placeholder='User Name' className='text-input' onChange={(e)=>setName(e.target.value)}/>
            <input type='email' placeholder='Email' className='text-input' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' className='text-input' onChange={(e)=>setPassword(e.target.value)}/>
            <div className='container'> 
                <div className='container'>
                <input type="checkbox" /> <div>I Accept the terms & conditions</div>
                </div>
            </div>
            <button className='btn' onClick={(e)=> signUp()}>Sign up</button>
            <div onClick={(e)=>setState(1)} className="tag">Existing User? Log in</div>
        </div>
        </div>
    )
}
export default Signup;