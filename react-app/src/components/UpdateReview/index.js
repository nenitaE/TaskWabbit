import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRevById } from "../../store/reviews";
import UpdateReview from "./UpdateReview";


const Update = () => {
    const dispatch = useDispatch();

    const {id} = useParams()
    console.log(id, 'test')
    const review = useSelector(state => state.reviewReducer[id])
    console.log(review, 'review update')

    useEffect(() => {

        dispatch(getRevById(id))
        console.log(id, 'idTest')
    }, [dispatch])

    if(!review){
        return(
            <p>loading...</p>
        )
    }

    // converting to Object
    let reviewObj = review
    console.log(reviewObj, 'reviewObj --------')

    return(
        // <p>Test</p>
        <UpdateReview reviewObj={reviewObj} />
    )
}

export default Update
