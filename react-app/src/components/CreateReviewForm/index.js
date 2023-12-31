import { useEffect, useState } from "react";
import CreateReviewForm from "./createReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { getReviewForLoggedIn } from "../../store/reviews";


export default function CreateReviewModal ({tasker_id, task_id}){

   
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    };

    const user = useSelector( state => state.session.user)
    const rev = useSelector( state => Object.values(state.reviewReducer))
    
    useEffect(() => {
        dispatch(getReviewForLoggedIn())
    }, [dispatch])

    let arr = rev.filter(
        function (ele) {
            return ele.task_id === task_id
        }
    )
    

    if(arr.length){
        return(
            <button className="select-button" onClick={toggleModal}
            disabled={arr.length}
            >
                You have Reviewed it Already
            </button>
        )
    }

    return (
        <>
            <button className="select-button" onClick={toggleModal}
            >
                Leave a Review
            </button>

            {modal && (
                <div>
                    <div onClick={toggleModal}></div>
                    <div>
                        <CreateReviewForm test={tasker_id} taskId={task_id}/>
                    </div>
                </div>
            )}
        </>
    )
}
