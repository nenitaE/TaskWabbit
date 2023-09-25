import React from 'react';

const AverageRating = ({ reviews }) => {
    // Get the ratings from the reviews array
    let ratings = reviews.map((obj) =>obj.rating)

    // Get the average rating
    const getAvgRating = () => {
        if (ratings.length === 0) {
        return 0;
        }

        const totalRating = ratings.reduce((accum, rating) => accum + rating, 0);
        return totalRating / ratings.length;
    };

    const avgStars = () => {
        const avgRating = getAvgRating();
        const maxRating = 5; 
        const solidStars = Math.floor(avgRating)
        const emptyStars = Math.floor(maxRating - avgRating)
        const partialStars = Math.ceil(maxRating - (avgRating + emptyStars))
        
        const starsArr = [];
        for (let i = 0; i < solidStars; i++) {
            starsArr.push(<span key={i} className="solidStars">&#x2605;</span>);
        }

        for (let i = 0; i < emptyStars; i++) {
            starsArr.push(<span key={i + solidStars} className="emptyStars">&#x2606;</span>);
        }
        for (let i = 0; i < partialStars; i++) {
            starsArr.push(<span key={i + partialStars} className="partialStars"><div>★</div><div>&#x2606;</div></span>);
        }
        
        return starsArr
    };

    return (
        <div className="avgStarRating">
        <div className="stars">{avgStars()}</div>
        <p>Average Rating: {getAvgRating().toFixed(2)}</p>
        </div>
    );
};

export default AverageRating;
