import React from "react";
import User from './user'

const Users = ({users, ...rest}) => {

    return (
        <table className='table'>
            <thead>
            <tr>
                <th>Имя</th>
                <th>Качества</th>
                <th>Профессия</th>
                <th>Встретился, раз</th>
                <th>Оценка</th>
                <th>Избранное</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
                {users.map((user) => <User key={user._id} user={user} {...rest} />)}
            </tbody>
        </table>
    )
}

export default Users