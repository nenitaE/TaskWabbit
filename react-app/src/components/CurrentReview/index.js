import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewForLoggedIn } from "../../store/reviews";
import { getTaskers } from "../../store/taskers";
import DeleteReview from "../DeleteReviewModal/DeleteReview";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const ReviewByLoggedIn = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    // state
    const reviewList = useSelector(state => Object.values(state.reviewReducer))
    console.log(reviewList, 'state Result')
    const user = useSelector(state => state.session.user)
    console.log(user, 'user-------------')

    let reviewDate;

    useEffect(() => {
        dispatch(getReviewForLoggedIn())
        dispatch(getTaskers())
    }, [dispatch, user])

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
                            {rev.id}
                        <div>
                            {new Date(rev.created_at).toDateString()}
                        </div>
                        <div>
                            <DeleteReview id={rev.id} />
                        </div>
                        <div>
                            {/* <Link to={`/reviews/${rev.id}/edit`}>
                                <button>Update Review</button>
                            </Link> */}
                            <button onClick={
                                () => history.push(`/reviews/${rev.id}/edit`)
                            }>Update</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default ReviewByLoggedIn
