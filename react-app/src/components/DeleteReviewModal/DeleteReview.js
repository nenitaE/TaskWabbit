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
        // console.log('testing---- in handleDel')
        dispatch(delReviewById(id))
        toggleModal()
    }

    return (
        <>
            <button className='deleteBtn' onClick={toggleModal}>
                Delete
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content">
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete this review?</p>
                            <button onClick={handleDelete} style={{backgroundColor: 'pink'}}>
                                Yes (Delete Review)
                            </button>
                            <button onClick={toggleModal} style={{backgroundColor: '#006b54'}}>
                                No (Keep Review)
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
