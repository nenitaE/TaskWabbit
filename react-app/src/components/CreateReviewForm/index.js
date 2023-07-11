import { useState } from "react";
import CreateReviewForm from "./createReviewForm";


export default function CreateReviewModal ({tasker_id}){

    console.log(tasker_id, 'tasker_id---')

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <>
            <button onClick={toggleModal}>
                Leave a Review
            </button>

            {modal && (
                <div>
                    <div onClick={toggleModal}></div>
                    <div>
                        <CreateReviewForm test={tasker_id}/>
                    </div>
                </div>
            )}
        </>
    )
}
