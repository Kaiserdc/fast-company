import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const declension = (number) => {
        const titles = ['человек', 'человека']
        const cases = [0, 0, 1, 1, 1, 0]
        return titles[
            number % 100 > 4 && number % 100 < 20
                ? 0
                : cases[number % 10 < 5 ? number % 10 : 5]
        ]
    }
    return (
        <h2>
            <span
                className={
                    'badge bg-' +
                    (length === 0 || !length ? 'danger' : 'primary')
                }
            >
                {length === 0 || !length
                    ? 'Никто с тобой не тусанет'
                    : `${length} ${declension(length)} тусанет с тобой сегодня`}
            </span>
        </h2>
    )
}

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
