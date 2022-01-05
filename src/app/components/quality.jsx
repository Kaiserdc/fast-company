import React from "react"

const Quality = (props) => {
    const getUserQualitiesClasses = (color) => `badge me-2 bg-${color}`
    const getUserQualities = () => <span className={getUserQualitiesClasses(props.color)}>{props.name}</span>
    return getUserQualities()
}

export default Quality