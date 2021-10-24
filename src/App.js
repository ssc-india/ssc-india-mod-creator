import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const serverURL = process.env.REACT_APP_BE_URL || '';
const SignupAPI = process.env.REACT_APP_Auth_Signup || '';

const App = () => {
  const [name, setName] = useState('');
  const [institute, setInstitute] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState({});
  const [errorCode, setErrorCode] = useState(0);

  const submit = () => {
    setUserCreated({});
    setErrorCode(0);

    axios.post(serverURL + SignupAPI,
      {
        name: name,
        institute: institute,
        branch: branch,
        email: email,
        password: password
      },
      { withCredentials: true }
    ).then(() => {
      setUserCreated({
        email: email,
        password: password
      });
      setName('');
      setInstitute('');
      setBranch('');
      setEmail('');
      setPassword('');
    }).catch(({response}) => setErrorCode(response.status));
  }
  
  return (
    <div className="App">
      {
        'email' in userCreated ?
          <div className='userCreated'>
            <p>User created!</p><br />
            <div>
              <label htmlFor='createdEmail'>Email</label>
              <p name='createdEmail'>{userCreated.email}</p>
            </div>
            <div>
              <label htmlFor='createdPass'>Password</label>
              <p name='createdPass'>{userCreated.password}</p>
            </div>
          </div> :
          null
      }

      {
        errorCode ?
          <div className='error'>
            <p>Failed; Error code {errorCode}</p>
          </div> :
          null
      }

      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <label htmlFor='institute'>Institute</label>
        <input type='text' name='institute' value={institute} onChange={e => setInstitute(e.target.value)} />
      </div>

      <div>
        <label htmlFor='branch'>Branch</label>
        <input type='text' name='branch' value={branch} onChange={e => setBranch(e.target.value)} />
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <label htmlFor='password'>Password (min 8 chars)</label>
        <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <button onClick={submit} disabled={password.length < 8}>Add Mod</button>
    </div>
  );
}

export default App;
