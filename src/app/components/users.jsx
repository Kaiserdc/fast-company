import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {paginate} from '../utils/paginate'
import User from './user'
import api from '../api'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'

const Users = ({users: allUsers, ...rest}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()

    const pageSize = 4
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data)
        })
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const filteredUsers = selectedProf
        ? allUsers.filter(
            (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
        : allUsers
    const count = filteredUsers.length
    const userCrop = paginate(filteredUsers, currentPage, pageSize)
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }
    const clearFilter = () => {
        setSelectedProf()
    }
    return (
        <div className={'row py-3'}>
            {professions && (
                <div className={'col-md-3'}>
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        valueProperty="_id"
                        contentProperty="name"
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className={'btn btn-secondary mt-2'}
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className={'col-md-9'}>
                <SearchStatus length={count}/>
                {count > 0 && (
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
            </div>
        </div>
    )
}
Users.propTypes = {
    users: PropTypes.array
}
export default Users
