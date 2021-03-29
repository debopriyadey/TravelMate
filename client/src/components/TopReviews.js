import React from 'react';
import Reviews from './Reviews'
// import places from '../Reviews';
import { useSelector } from 'react-redux';

export default function TopReviews() {
    const allreviews = useSelector(state => state.allreviews)
    return (
        <div id="top-reviews">
            <div>
                <h1 style={{ textAlign: 'center', color: 'white' }}> Top Reviews </h1>
            </div>
            <Reviews reviews={allreviews} />
        </div>
    )
}
