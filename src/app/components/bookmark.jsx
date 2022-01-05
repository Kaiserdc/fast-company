import React from "react";

const Bookmark = ({status, onBookmark}) => {
    const getBookmarkIconClasses = () => {
        let classes = "bi "
        classes += status ? "bi-heart-fill text-danger" : "bi-heart text-muted"
        return classes
    }
    return (
        <>
            <button className={'btn btn-link'} onClick={() => onBookmark(!status)}>
                <i className={getBookmarkIconClasses()}></i>
            </button>
        </>
    )
}

export default Bookmark