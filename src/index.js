import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Users from "./components/users";

const App = () => {
    return (
        <div className='container-fluid'>
            <Users/>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));
