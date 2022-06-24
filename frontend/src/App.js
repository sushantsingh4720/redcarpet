import './App.css';
import Login from './components/login.js';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import {useState, useEffect} from  'react';

function App() {
  const [user, setUser] = useState({});
  const [state, setState] = useState(0);
  const [link, setLink] = useState('');
  const num = Math.floor(Math.random()*999);
    useEffect( ()=>{
        async function fetchLogo(){
            const response = await fetch(`https://picsum.photos/id/${num}/info`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const imglink = await response.json();
            setLink(imglink.download_url);
        }
        fetchLogo();
    }, []);
  return (
    <div className="App">
      {
        state === 0 && <Signup setUser={setUser} setState={setState}/>
      }
      
      {
        state === 1 && <Login setUser={setUser} setState={setState}/>
      }
      {
        state === 2 && <Dashboard user={user} link={link} />
      }
    </div>
  );
}

export default App;
