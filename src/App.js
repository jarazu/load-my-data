// import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef('');
  const emailRef = useRef('');

  useEffect(() => {
    fetch('http://localhost:9000/users')
    .then(res => res.json())
    .then(data => setUsers(data))

  }, [])

  const handleAddUser = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log('name', name)
    const newUser = {name:name, email:email}

    fetch('http://localhost:9000/users', {
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => setUsers(data))

  }
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="Submit" value="Submit"/>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
