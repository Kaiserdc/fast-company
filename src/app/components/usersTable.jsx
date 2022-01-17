import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`users/${user._id}`} title={ user.name }>{user.name}</Link>
            ),
        },
        qualities: {
            name: 'Качества',
            component: (user) => <QualitiesList qualities={user.qualities}/>,
        },
        profession: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark status={user.bookmark} onClick={() => onToggleBookmark(user._id)}/>
            ),
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            ),
        },
    }
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default UsersTable
