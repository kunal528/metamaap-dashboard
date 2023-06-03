import React from 'react'
import './Users.css'
import useAccess from '../adapters/useAccess'
import Navbar from '../components/Navbar'
import useFirebase from '../adapters/useFirebase'
import AddUserDialog from '../components/dialog/AddUserDialog'

const Users = () => {
    const [users, setUsers] = React.useState([])
    const { getUsers, deleteUser } = useAccess()
    const [addShow, setAddShow] = React.useState(false)
    const { getUser } = useFirebase()
    React.useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, [])

    const handleAdd = (user) => {
        setUsers([...users, user])
    }
    return (
        <div>
            <Navbar />
            <div className='home-container'>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px'}}>
                <div className='add-button' onClick={() => setAddShow(true)}>Add</div>
                </div>
                <div className='metaverse-title-header'>
                    <div style={{ flex: '0.1' }}></div>
                    <div className='metaverse-divider' />
                    <div style={{ flex: '0.3' }}>ID</div>
                    <div className='metaverse-divider' />
                    <div style={{ flex: '0.4' }}>Email</div>
                    <div className='metaverse-divider' />
                    <div style={{ flex: '0.2' }}></div>
                </div>
                {users.map((metaverse, index) => {
                    return <div state={metaverse} className='metaverse-data'>
                        <div style={{ flex: '0.1' }}>{index + 1}</div>
                        <div className='metaverse-divider black' />
                        <div style={{ flex: '0.3' }}>{metaverse.id}</div>
                        <div className='metaverse-divider black' />
                        <div style={{ flex: '0.4' }}>{metaverse.email}</div>
                        <div className='metaverse-divider black' />
                        <div style={{flex: '0.2'}}>
                            <img src="/clear.png" className='delete-button' alt="delete" onClick={() => {
                                if (getUser().email === metaverse.email)
                                    alert('Cannot delete your own account')
                                else
                                    if (window.confirm('Are you sure you want to delete this user?')){
                                        deleteUser(metaverse.id).then(() => {
                                            setUsers(users.filter((user) => user.id !== metaverse.id))
                                        })
                                    }
                            }}/>
                        </div>
                    </div>
                })
                }
            </div>
                {addShow && <AddUserDialog onClose={() => {setAddShow(false)}} onAddUser={handleAdd}/>}
        </div>
    )
}

export default Users