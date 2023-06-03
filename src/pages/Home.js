import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import useFirebase from '../adapters/useFirebase'
import { Link } from 'react-router-dom'

const Home = () => {
    const { getMetaverses } = useFirebase()

    const [metaverses, setMetaverses] = React.useState([])

    React.useEffect(() => {
        getMetaverses().then((metaverses) => {
            setMetaverses(metaverses)
        })
    }, [])

  return (
    <div>
        <Navbar />
        <div className='home-container'>
                <div className='home-title'>Welcome back, Admin</div>
                <div className='metaverse-title-header'>
                    <div style={{flex: '0.1'}}></div>
                    <div className='metaverse-divider'/>
                    <div style={{flex: '0.2'}}>ID</div>
                    <div className='metaverse-divider'/>
                    <div style={{flex: '0.3'}}>Name</div>
                    <div className='metaverse-divider'/>
                    <div style={{flex: '0.4'}}>Description</div>
                    <div className='metaverse-divider'/>
                    <div style={{flex: '0.2'}}>Email</div>
                </div>
                {metaverses.map((metaverse, index) => {
                 return <Link to={`/metaverse/${metaverse.id}`} state={metaverse} className='metaverse-data'>
                    <div style={{flex: '0.1'}}>{index + 1}</div>
                    <div className='metaverse-divider black'/>
                    <div style={{flex: '0.2'}}>{metaverse.metaverseId}</div>
                    <div className='metaverse-divider black'/>
                    <div style={{flex: '0.3'}}>{metaverse.name}</div>
                    <div className='metaverse-divider black'/>
                    <div style={{flex: '0.4'}}>{metaverse.description}</div>
                    <div className='metaverse-divider black'/>
                    <div style={{flex: '0.2'}}>{metaverse.email}</div>
                </Link>
                })
                }
            </div>
    </div>
  )
}

export default Home