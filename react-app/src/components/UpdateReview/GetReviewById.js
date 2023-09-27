import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getRevById } from "../../store/reviews"


const GetReview = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const selectReview = useSelector( state => Object.values(state.reviewReducer))
   

    useEffect(() => {
        dispatch(getRevById(id))
    }, [dispatch])

    if(!selectReview[0]){
        return(
            <p>
                ...loading
            </p>
        )
    }
    return (
        <>
            <p>The Review</p>
            <p>{selectReview[0].description}</p>
        </>
    )
}

export default GetReview
