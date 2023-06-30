import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteTaskerTaskType } from '../../store/taskerProfile';


const taskerTaskTypeDeleteModal = ({ taskerTaskTypeId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteTaskerTaskType(taskerTaskTypeId)).then(closeModal);
        history.push(`/taskerTaskTypes`)

    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this task-type?</h3>
            <button onClick={(handleDelete)}>
                {'Yes (Delete TaskType)'}
            </button>
            <button onClick={closeModal}>
                {'No (Keep TaskType)'}
            </button>
        </div>
    )
}

export default taskerTaskTypeDeleteModal;
