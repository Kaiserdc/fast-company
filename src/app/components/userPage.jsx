import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    })
    console.log(user)
    const handleBack = () => {
        history.push('/users')
    }
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h4 className='fw-bold'>Профессия: {user.profession.name}</h4>
                <QualitiesList qualities={user.qualities}/>
                <p className='mb-2'>Проведенные встречи: {user.completedMeetings}</p>
                <p>Оценка: {user.rate}</p>
                <button className='btn btn-secondary' onClick={handleBack}> Назад к списку </button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default UserPage
