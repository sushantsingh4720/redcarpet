import { React, useState } from 'react';

const Login = ({setUser, setState}) => {
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const login = async () =>{
        const data = {email, password};
        console.log(data);
        const response = await fetch('https://red-carpet-mern.herokuapp.com/api/users/login',  {
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
        <div className='flex-wrapper'>
        <div className='login'>
            <div>
                <h1>Log in!</h1></div>
            <input type='email' placeholder='Email' className='text-input' onChange={(e)=> setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' className='text-input' onChange={(e)=> setPassword(e.target.value)}/>
            <div className='container space-bet'> 
                <div className='container'>
                <input type="checkbox" /> <div>Remember me</div>
                </div>
                <div className='forgot-pass'>
                    Forgot Password?
                </div>
            </div>
            <button className='btn' onClick={(e)=> login()}>Log in</button>
            <div onClick={(e)=>setState(0)} className="tag">No Account? Sign up</div>
        </div>
        </div>
    )
}

export default Login