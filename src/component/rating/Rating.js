import React, { useEffect, useState } from 'react'

const Rating = ({ rating }) => {
    const [star, setStart] = useState([])

    useEffect(() => {
        let startArr = [];

        for (let i = 0; i < 5; i++) {
            let setClass = i < rating ? 'active-star' : 'default-start'
            startArr.push(<span key={i} className={setClass}>&#x02605;</span>)
        }
        return setStart(startArr)
    }, [rating])

    return (
        <span className="rating-left">
            {star}
        </span>
    )
}

export default Rating;