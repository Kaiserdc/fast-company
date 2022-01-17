import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import api from '../api'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', isSorted: false })
    const pageSize = 4
    const [users, setUsers] = useState()
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data)
        })
    }, [])
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const handleToggleBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user,
            ),
        )
    }
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])
    
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])
    
    const filteredUsers = selectedProf
        ? users.filter(
            (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf),
        )
        : users
    
    if (users) {
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
        
        const handleProfessionSelect = (item) => {
            setSelectedProf(item)
        }
        
        const handleSort = (item) => {
            setSortBy(item)
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
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
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
    return 'Loading...'
}
UsersList.propTypes = {
    users: PropTypes.array,
}
export default UsersList
