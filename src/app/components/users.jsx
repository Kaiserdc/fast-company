import React, {useState} from 'react'
import User from './user'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({users, ...rest}) => {
    const count = users.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const userCrop = paginate(users, currentPage, pageSize)

    return (
        <>
            {users.length > 0 && (
                <table className="table">
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
                        {userCrop.map((user) => (
                            <User key={user._id} user={user} {...rest} />
                        ))}
                    </tbody>
                </table>
            )}

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}
Users.propTypes = {
    users: PropTypes.object.isRequired
}
export default Users
