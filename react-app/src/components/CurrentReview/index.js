import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewForLoggedIn } from "../../store/reviews";
import { getTaskers } from "../../store/taskers";
import DeleteReview from "../DeleteReviewModal/DeleteReview";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import "./CurrentReview.css"

const ReviewByLoggedIn = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    // state
    const reviewList = useSelector(state => Object.values(state.reviewReducer))
    // console.log(reviewList, 'state Result')
    const user = useSelector(state => state.session.user)
    // const taskers = useSelector(state => Object.values(state.taskers))
    const taskers = useSelector(state => state.taskers)
    // console.log(user, taskers, 'user-------------')

    const[isLoaded, setIsLoaded] = useState(false)

    let taskerData = [];

    useEffect(() => {
        dispatch(getReviewForLoggedIn())
        dispatch(getTaskers()).then(() => setIsLoaded(true))
    }, [dispatch, user])

    if (!reviewList){
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }

    // taskers.forEach(tasker => {
    //     // console.log(tasker.id)
    //     // taskerData.push(tasker)
    // })
    // console.log(taskerData, 'tasker DATA')

    return (
        <>
            {isLoaded &&
            <div id="main">
                <div id="mainUser">
                    <h3 className="rev-headers">My Info</h3>

                    <div id="mainUserContent">

                        <div>
                            Username: {user.username}
                        </div>
                        <div>
                            Email: {user.email}
                        </div>
                    </div>
                </div>

                <div id="afterUser">

                </div>

                <h3 className="rev-headers">My Reviews ({reviewList.length})</h3>
                {reviewList.map( rev => (
                    <div className="singleReview" key={rev.id}>
                        
                        {rev.task_id && (
                            <div id="revContent">
                                Tasker Being Reviewed: {taskers[rev.tasker_id].firstName} {taskers[rev.tasker_id].lastName}
                            </div>
                        )}
                        <div></div>
                        {rev.task_id && (
                            <div id="revContent">
                                TaskType: {rev.task.taskType.type}
                            </div>
                        )}
                        {rev.task_id && (
                            <div id="revContent">
                                Task Title: {rev.task.title}
                            </div>
                        )}
                        
                        <div>

                        </div>
                        <div id="revContent">
                            <b>Review Date: {new Date(rev.created_at).toDateString()}</b>
                        </div>
                        <div id="revContent">
                            Rating: {rev.rating}
                        </div>
                        <div id="revContent">
                            Review: {rev.description}
                        </div>
                        
                    
                        <div id="button">
                            <div id="deleteButton">
                            <DeleteReview id={rev.id} />
                            </div>
                            <div id="update">
                            <button className='updateButton' onClick={
                                () => history.push(`/reviews/${rev.id}/edit`)
                            }>Update</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }
        </>
    )
}


export default ReviewByLoggedIn
