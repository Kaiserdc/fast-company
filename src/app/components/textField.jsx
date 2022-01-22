import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, name, type, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false)
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    className={getInputClasses()}
                    value={value}
                    onChange={onChange}
                />
                {type === 'password' && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
                    </button>
                )}
            </div>
            {error && <div className="form-text text-danger">{error}</div>}
        </div>
    )
}
TextField.defaultProps = {
    type: 'text',
}
TextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
}

export default TextField
