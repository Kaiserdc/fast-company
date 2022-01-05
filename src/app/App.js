import React, {useState} from "react";
import Users from './components/users'
import SearchStatus from "./components/searchStatus";
import api from './api/index'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const handleToggleBookmark = (id) => {
        setUsers(prevState => prevState.map(user => user._id === id ? ({...user, bookmark: !user.bookmark}) : user))
    }

    return (
        <div className='container-fluid'>
            <SearchStatus length={users.length}/>
            <Users users={users}
                   onDelete={handleDelete}
                   onBookmark={handleToggleBookmark}
            />
        </div>
    )
}

export default App