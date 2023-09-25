import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { delReviewById } from "../../store/reviews";
import "./DeleteReview.css"


export default function DeleteReview ({id}) {

    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleDelete = () => {
        
        dispatch(delReviewById(id))
        toggleModal()
    }

    return (
        <>
            <button className='deleteReviewButton' onClick={toggleModal}>
                Delete
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content" className="modal-container">
                            <h3>Confirm Delete</h3>
                            <p className="deletetext">Are you sure you want to delete this review?</p>
                            <button className="modal-button keep-button" onClick={handleDelete}>
                                Yes (Delete Review)
                            </button>
                            <button className="modal-button delete-button"onClick={toggleModal}>
                                No (Keep Review)
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
