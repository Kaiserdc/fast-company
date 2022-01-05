import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({length}) => {
    const declension = (number) => {
        const titles = ['человек', 'человека']
        const cases = [0, 0, 1, 1, 1, 0]
        return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
    }

    if (length === 0 || !length) return <span className={'badge bg-danger'}>Никто с тобой не тусанет</span>

    return (
        <span className={'badge bg-primary'}>
            {length} {declension(length)} тусанет с тобой сегодня
        </span>
    )
}

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
