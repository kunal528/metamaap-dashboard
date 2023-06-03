import React, { useEffect } from 'react'
import './MetaverseUpdation.css'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useFirebase from '../adapters/useFirebase'

const MetaverseUpdation = () => {
  const { state } = useLocation()
  const { metaverseId } = useParams()
  const { getMetaverse, updateMetaverse } = useFirebase()
  const [metaverse, setMetaverse] = React.useState(null)
  const navigate = useNavigate()

  const interests = [
    'Networking opportunity',
    'Metaverse asset research center',
    'CAMLab',
    'HR support',
    'Technical Development support',
    'Grant & Investor Access',
    'Marketing & Promotion support',
    'Industry Insights & report',
    'Policy advocacy',
    'Other'
  ]

  useEffect(() => {
    if (!state) {
      getMetaverse(metaverseId).then((metaverse) => {
        setMetaverse(metaverse)
      })
    }
    else {
      setMetaverse(state)
    }

  }, [state])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetaverse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setMetaverse((prevState) => ({
        ...prevState,
        interests: [...prevState.interests, e.target.value],
      }));
    } else {
      setMetaverse((prevState) => ({
        ...prevState,
        interests: prevState.interests.filter((interest) => interest !== e.target.value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMetaverse(metaverse, metaverseId)
    navigate('/');
  }

  

  if (!metaverse) return (<div>Loading...</div>);
  return (
    <div>
      <Navbar />
      <div className='banner-image' style={{ backgroundImage: `url(${metaverse.image})` }}>
        <img src={metaverse.logo} alt="Group-1" border="0" className='logo-image' />
      </div>
      <div className='metaverse-updation-form'>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='Metaverse ID' name="metaverseId" onChange={handleChange} className='metaverse-updation-input' value={metaverse.metaverseId} required />
          <input type='text' placeholder='Metaverse Name' name="name" onChange={handleChange} className='metaverse-updation-input' value={metaverse.name} required />
        </div>
        <textarea type='text' placeholder='Metaverse Description' name="description" onChange={handleChange} className='metaverse-updation-input' rows={5} value={metaverse.description} required />
        <div className='metaverse-updation-row'>
          <input className='metaverse-updation-input' type='url' name='logo' onChange={handleChange} placeholder='Attach one Logo of your Metaverse' value={metaverse.logo} required />
          <input className='metaverse-updation-input' type='url' name="image" onChange={handleChange} placeholder='Attach one Image of your Metaverse' value={metaverse.image} required />
        </div>
        <div className='metaverse-updation-row'>
          <select placeholder='Category' className='metaverse-updation-input' onChange={handleChange} value={metaverse.category} name="category">
            <option value='Multiplayer Arcade Game'>Multiplayer Arcade Game</option>
            <option value='Fantasy World/Game'>Fantasy World/Game</option>
            <option value='Retail/Commercial Brand Experience'>Retail/Commercial Brand Experience</option>
            <option value='Influencer/Celebrity World'>Influencer/Celebrity World</option>
            <option value='Educational/Cultural Experience'>Educational/Cultural Experience</option>
            <option value='Artistic Immersive Experience'>Artistic Immersive Experience</option>
          </select>
          <input type='text' placeholder='Email' className='metaverse-updation-input' name="email" onChange={handleChange} value={metaverse.email} required />
        </div>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='Website' className='metaverse-updation-input' name="website" onChange={handleChange} value={metaverse.website} required />
          <input type='text' placeholder='Demo' className='metaverse-updation-input' name="demo" onChange={handleChange} value={metaverse.demo} required />
        </div>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='Discord' className='metaverse-updation-input' name="discord" onChange={handleChange} value={metaverse.discord} />
          <input type='text' placeholder='LinkedIn' className='metaverse-updation-input' name="linkedin" onChange={handleChange} value={metaverse.linkedin} required />
        </div>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='Twitter' className='metaverse-updation-input' name="twitter" onChange={handleChange} value={metaverse.twitter} required />
          <input type='text' placeholder='Instagram' className='metaverse-updation-input' name="instagram" onChange={handleChange} value={metaverse.instagram} required />
        </div>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='First Name' className='metaverse-updation-input' name="firstName" onChange={handleChange} value={metaverse.firstName} required />
          <input type='text' placeholder='Preferred First Name' className='metaverse-updation-input' name="preferredName" onChange={handleChange} value={metaverse.preferredName} />
          <input type='text' placeholder='Last Name' className='metaverse-updation-input' name="lastName" onChange={handleChange} value={metaverse.lastName} required />
        </div>
        <div className='metaverse-updation-row'>
          <input type='text' placeholder='Phone No.' className='metaverse-updation-input' name="phone" onChange={handleChange} value={metaverse.phone} required />
          <input type='text' placeholder='Nationality' className='metaverse-updation-input' name="nationality" onChange={handleChange} value={metaverse.nationality} />
          <input type='text' placeholder='City' className='metaverse-updation-input' name="city" onChange={handleChange} value={metaverse.city} required />
        </div>
        <fieldset className='metaverse-fieldset' >
          <legend>What interests you about Metaverse Council ?:</legend>
          {interests.map((interest, index) => {
            return <div className='metaverse-alternative'>
              <input type='checkbox' id={'metaverse-alternative-' + index} name='interests' checked={metaverse.interests.includes(interest)} onChange={handleCheckboxChange} value={interest} />
              <label htmlFor={'metaverse-alternative-' + index}>{interest}</label>
            </div>
          })
          }
        </fieldset>
        <div style={{display: 'flex', justifyContent:"flex-end"}}>
          <div className='metaverse-updation-button' onClick={handleSubmit}>Update</div>
        </div>
      </div>
    </div>
  )
}

export default MetaverseUpdation