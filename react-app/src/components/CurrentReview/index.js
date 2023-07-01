import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewForLoggedIn } from "../../store/reviews";
import { getTaskers } from "../../store/taskers";

const ReviewByLoggedIn = () => {
    const dispatch = useDispatch();

    // state
    const reviewList = useSelector(state => Object.values(state.reviewReducer))
    console.log(reviewList, 'state Result')

    let reviewDate;

    useEffect(() => {
        dispatch(getReviewForLoggedIn())
        dispatch(getTaskers())
    }, [dispatch])

    if (!reviewList){
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }

    return (
        <>
        <h1>Reviews ({reviewList.length})</h1>
            <div>
                {reviewList.map( rev => (
                    <div className=".">
                        <div>
                            {rev.description}
                        </div>
                            {new Date(rev.created_at).toDateString()}
                    </div>
                ))}
            </div>
        </>
    )
}


export default ReviewByLoggedIn
