import React, { useEffect } from 'react'
import './Dialog.css'
import useFirebase from '../../adapters/useFirebase'
import useAccess from '../../adapters/useAccess'
import axios from 'axios'

const AddUserDialog = ({onClose, onAddUser}) => {
  const [user, setUser] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [role, setRole] = React.useState(null)
  const { addUser, signin } = useAccess()
  const [users, setUsers] = React.useState([])

  useEffect(() => {
    // add header of project as metamaap
    axios.get('https://main--creative-klepon-fe022b.netlify.app/api/user',{
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      setUsers(res.data)
    }
    )
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user) {
      var newUser = users.find((u) => u.uid === user)
      if (newUser) {
        addUser(newUser.uid, newUser.email).then((val) => {
          alert('User added successfully')
          onAddUser(val)
          onClose()
        })
      }

    }
    else {

      var docRef = document.getElementsByTagName('inputs');
      for (var i = 0; i < docRef.length; i++) {
        var input = docRef[i];
        var validate = input.reportValidity();
      if (!validate) {
        return;
      }
    }
    signin(email, password).then((val) => {
      if (val) {
        addUser(val.user.uid, email).then((val) => {
          alert('User added successfully')
          onAddUser(val)
          onClose()
        })
      }
      else {
        alert('User already exists')
      }
    })
  }
  }

  return (
    <div className='dialog'>
      <div className='dialog-container'>
        <div className='dialog-title'>Add User</div>
        {/* add users from the existing database or from the form */}
        <div className='dialog-input-container'>
          <div className='dialog-input-title'>User ID</div>
          <select className='dialog-input' onChange={(e) => setUser(e.target.value)}>
            <option value=''>Select User</option>
            {users.map((user) => {
              return <option key={user.uid} value={user.uid}>{user.email}</option>
            })}
          </select>
        </div>
        <div className='divider'></div>
        <div className='dialog-input-container'>
          <div className='dialog-input-title'>Email</div>
          <input type='text'  className='dialog-input' onChange={(e) => setEmail(e.target.value)} required/>
          <div className='dialog-input-title'>Password</div>
          <input type='password' className='dialog-input' onChange={(e) => setPassword(e.target.value)} required/>
        </div>
      <div className='dialog-button-container'>
        <div className='dialog-button cancel' onClick={onClose}>Cancel</div>
        <div className='dialog-button' onClick={handleSubmit}>Add</div>
      </div>
      </div>
    </div>

  )
}

export default AddUserDialog