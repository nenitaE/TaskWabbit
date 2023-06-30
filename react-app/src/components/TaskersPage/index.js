import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTaskers } from "../../store/taskers";

function TaskersPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaskers())
    }, [dispatch])

    return (
        <div>
            <h1>HEY YOU MADE IT TO TASKERS PAGE! CONGRATS</h1>
        </div>
    )
}



export default TaskersPage
