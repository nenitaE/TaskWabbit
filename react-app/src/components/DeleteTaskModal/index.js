import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/tasks";
import { useModal } from "../../context/Modal";

function DeleteTaskModal({taskId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleDelete = async(e) =>{
        e.preventDefault();
        const data = await dispatch(deleteTask(taskId))
        // if(data && Array.isArray(data)){
        //     setErrors(data);
        // }else {
            closeModal();
        // }
    };
    return (
        <div>
            <h1>Are you sure you want to delete this task</h1>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={closeModal}>No, Cancel</button>
        </div>
    )
}

export default DeleteTaskModal;
