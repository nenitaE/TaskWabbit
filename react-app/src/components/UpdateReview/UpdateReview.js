import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { updateReview } from "../../store/reviews";


const UpdateReview = ({reviewObj}) => {

    // console.log(reviewObj, typeof(reviewObj.id), 'test reviewObj')
    const [description, setDescription] = useState(reviewObj.description)
    const [rating, setRating] = useState(reviewObj.rating)
    const [tasker_id, setTasker] = useState(reviewObj.tasker_id)
    const [validation, setValidation] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(rating, typeof(rating), 'test')

        const errors = {}
        if(description.length < 5 || description.length > 100) errors['description'] = 'Review requires atleast 5 characters or below 100 characters'
        if(rating < 1 || rating > 5) errors['rating'] = 'Rating must be between 1 and 5'

        if(Object.values(errors).length){
            setValidation(errors)
            return
        }

        // rating = parseInt(rating)
        const payload = {
            description,
            rating: Number(rating)
        }
        const id = reviewObj.id
        // console.log(payload, id, 'update in handle')
        // console.log(rating, typeof(rating), 'test2----')

        let updated = await dispatch(updateReview(payload, id))
        // console.log(updated, 'update in handle--')

        if(updated){
            return history.push('/reviews/currentUser')
        }

        setValidation({})
    }

    return(
        <>
            <h1>Update Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>How was the servie?</h3>
                    <p>Please describe your experience</p>
                    <label>
                        Description:
                        <textarea
                            id='description'
                            placeholder="maximum 100 characters"
                            required
                            value={description}
                            type='text'
                            onChange={ e => setDescription(e.target.value)}
                            />
                            {
                                validation.description && (
                                    <div style={{color: 'red'}}>
                                        {validation.description}
                                    </div>
                                )
                            }
                    </label>
                </div>
                <div>
                    <h3>Please give a rating</h3>
                    <label>
                        Rating:
                        <input
                            id='rating'
                            type='number'
                            required
                            placeholder="Rate between 1 & 5"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            />
                            {
                                validation.rating && (
                                    <div style={{color: 'red'}}>
                                        {validation.rating}
                                    </div>
                                )
                            }
                    </label>
                </div>
                <div>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </>
    )
}


export default UpdateReview
