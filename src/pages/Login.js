import React, { useState } from 'react'
import './Login.css'
import useFirebase from '../adapters/useFirebase'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, getUserProfileByEmail } = useFirebase()
    const handleSubmit = async (e) => {
        e.preventDefault()
        var docRef = document.getElementsByTagName('inputs');
        for (var i = 0; i < docRef.length; i++) {
            var input = docRef[i];
            var validate = input.reportValidity();
            if (!validate) {
              return;
            }
          }
        var result = await getUserProfileByEmail(email);
        console.log(result)
        if (result.length > 0 && (result[0].role === 'super admin' || result[0].role === 'admin')) {
            login(email, password).catch((error) => {
                alert(error.message)
            });
        }
        else {
            alert('You are not an admin');
        }
    }
  return (
    <div className="content">
        <form action="#" className="form-content">
            <div className="form-item">
                <input type="email" className="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                <label className="move" for="username">Email</label>
            </div>
            <div className="form-item">
                <input type="password" className="text" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                <label className="move" for="password">Password</label>
            </div>
            <div className="button" onClick={handleSubmit}>
                <span style={{zIndex: 99}}>LOGIN</span>
                <div className="button-ball"></div>
            </div>
        </form>
    </div>
  )
}

export default Login