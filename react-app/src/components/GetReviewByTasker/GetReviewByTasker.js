import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewByTaskerId } from "../../store/reviews";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getTaskers } from "../../store/taskers";


const ReviewsByTasker_id = () => {

    const dispatch = useDispatch()

    const list = useSelector(state => Object.values(state.reviewReducer))
    const taskerData = useSelector(state => Object.values(state.taskers))
    let {tasker_id} = useParams()
    tasker_id = Number(tasker_id)
    console.log(list, tasker_id, typeof(tasker_id),'state in compo')
    console.log(taskerData, 'Data-----')

    useEffect(() => {
        dispatch(getReviewByTaskerId((tasker_id)))
        dispatch(getTaskers())
    }, [dispatch])

    let tasker = []
    taskerData.forEach( data => {
        console.log(data.id, 'data ID')
        if(data.id === tasker_id){
            return tasker.push(data)
        }
    })
    console.log(tasker, 'tasker data')

    return (
        <>
            <h1>Tasker's Reviews</h1>
            <div>
                {list.map(rev => (
                    <div>
                        <div>
                            {rev.description}
                        </div>
                        <div>
                            {new Date(rev.created_at).toDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default ReviewsByTasker_id
