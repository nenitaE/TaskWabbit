import React from 'react';

function ReviewsModal({ reviews, closeModal }){
    return (
        <div>
            <button onClick={closeModal}>Close</button>
            {reviews.map((review, index) => {
                <div key={index}>
                    <h3>{review.rating}</h3>
                    <p>{review.description}</p>
                </div>
            })}
        </div>
    )
}

export default ReviewsModal;
