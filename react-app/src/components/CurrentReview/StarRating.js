import React from "react";

const StarRating = ({ rating }) => {
    
  const numStars = 5;
  const solidStars = rating;
  const emptyStars = numStars - solidStars;

  // Create an array of stars to render
  const stars = [];
  for (let i = 0; i < solidStars; i++) {
    stars.push(<span key={i} className="solidStars">&#x2605;</span>);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={i + solidStars} className="emptyStars">&#x2606;</span>);
  }

  return <span className="starRating">{stars}</span>;
};

export default StarRating;