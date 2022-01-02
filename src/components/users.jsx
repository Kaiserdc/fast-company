import React, {useState} from "react";
import api from '../api/index'


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
        console.log(userId)
    }
    const declension = (number) => {
        const titles = ['человек', 'человека']
        const cases = [0, 0, 1, 1, 1, 0];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
    const getUserQualitiesClasses = (color) => {
        return `badge ms-2 bg-${color}`
    }
    const getUserQualities = (qualities) => {
        return qualities.map(quality => (
            <span key={quality.key} className={getUserQualitiesClasses(quality.color)}>{quality.name}</span>))
    }
    const getUserProfession = (profession) => {
        return (<span key={profession._id}>{profession.name}</span>)
    }
    const renderPhrase = (number) => {
        if (number === 0) return <span className={'badge bg-danger'}>Никто с тобой не тусанет</span>
        return <span className={'badge bg-primary'}>{number} {declension(number)} тусанет с тобой сегодня</span>
    }
    const renderTable = (usersArray) => {
        if (usersArray.length !==0) return (
            <table className='table'>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Качества</th>
                    <th>Профессия</th>
                    <th>Встретился, раз</th>
                    <th>Оценка</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {usersArray.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{getUserQualities(user.qualities)}</td>
                        <td>{getUserProfession(user.profession)}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td>
                            <button className={'btn btn-danger'} onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
    return (
        <>
            <h3>{renderPhrase(users.length)}</h3>
            {renderTable(users)}
        </>
    )
}

export default Users