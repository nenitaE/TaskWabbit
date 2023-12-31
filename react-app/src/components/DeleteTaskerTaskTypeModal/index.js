import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteTaskerTaskType, getTaskerTaskTypes } from '../../store/taskerProfile';
import './deleteTaskerTaskType.css';

const DeleteTaskerTaskTypeModal = ({ taskerTaskTypeId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();


    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteTaskerTaskType(taskerTaskTypeId))
        .then(dispatch(getTaskerTaskTypes()))
        .then(closeModal)
        .then(history.push(`/taskerTaskTypes/current`))
    }
    

    return (
        <div className='modal-container'>
            <h2 className="deletetext">Confirm Delete</h2>
            <h3>Are you sure you want to delete this task-type?</h3>
            <button className="modal-button delete-button" onClick={(handleDelete)}>
                {'Yes (Delete TaskType)'}
            </button>
            <button className="modal-button keep-button" onClick={closeModal}>
                {'No (Keep TaskType)'}
            </button>
        </div>
    )
}

export default DeleteTaskerTaskTypeModal;
