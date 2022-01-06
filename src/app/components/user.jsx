import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({user, onDelete, onBookmark}) => {
    const getUserProfession = (profession) => {
        return <span key={profession._id}>{profession.name}</span>
    }
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qualityEntry) => (
                    <Quality key={qualityEntry._id} {...qualityEntry} />
                ))}
            </td>
            <td>{getUserProfession(user.profession)}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td className="text-center">
                <Bookmark
                    status={user.bookmark}
                    onBookmark={() => onBookmark(user._id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default User
