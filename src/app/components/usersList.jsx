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
    const [users, setUsers] = useState()
    const [professions, setProfession] = useState()
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', isSorted: false })
    const [searchTerm, setSearchTerm] = useState()
    
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
    
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])
    
    const usersFilterResult = users && selectedProf
        ? users.filter(
            (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf),
        )
        : users
    
    const usersSearchResult = users && searchTerm
        ? users.filter(
            user => {
                return user.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
        : users
    
    console.log(usersSearchResult)
    const filteredUsers = users && usersFilterResult.length < usersSearchResult.length
        ? usersFilterResult
        : usersSearchResult
    
    if (users) {
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
        
        const clearFilter = (handler) => {
            handler()
        }
        const handleSort = (item) => {
            setSortBy(item)
        }
        const handleProfessionSelect = (item) => {
            clearFilter(setSearchTerm)
            setSelectedProf(item)
        }
        const handleSearch = ({ target }) => {
            clearFilter(handleProfessionSelect)
            setSearchTerm(target.value)
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
                    <div className="my-3">
                        <input
                            type="text"
                            className="form-control"
                            id="searchInput"
                            placeholder="Search user"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
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
