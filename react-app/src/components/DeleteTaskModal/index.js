import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/tasks";
import { useModal } from "../../context/Modal";
import "./DeleteTaskModal.css";

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
        <div className="modal-container">
            <h2 className="deletetext">Are you sure you want to delete this task</h2>
            <button className="modal-button delete-button" onClick={handleDelete}>Yes, Delete!</button>
            <button className="modal-button keep-button" onClick={closeModal}>No, Keep it.</button>
        </div>
    )
}

export default DeleteTaskModal;
