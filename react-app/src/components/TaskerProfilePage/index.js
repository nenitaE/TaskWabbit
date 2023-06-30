import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTaskerTaskTypes} from "../../store/taskerProfile";

function TaskerProfilePage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaskerTaskTypes())
    }, [dispatch])

    return (
        <div>
            <h1>This will be the Tasker Profile Page</h1>
        </div>
    )
}



export default TaskerProfilePage