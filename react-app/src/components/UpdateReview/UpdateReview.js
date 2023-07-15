import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { updateReview } from "../../store/reviews";
import './UpdateForm.css'


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
        <div id="mainForm">
            <h3>Update Review</h3>

            <div id="afterTitle"></div>

            <form onSubmit={handleSubmit} id="form">
                <div>
                    <h4>How was the servie?</h4>
                    <p>Please describe your experience.</p>
                    <label>
                        <div>
                            Description:
                        </div>

                        <div>
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
                        </div>
                    </label>
                </div>
                <div>
                    <h4>Please give a rating</h4>
                    <label>
                        <div>
                            Rating:
                        </div>

                        <div>
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
                        </div>

                    </label>
                </div>

                <div id="afterFields"></div>

                <div id="updateDiv">
                    <button className='updateBtn' type='submit'>Update</button>
                </div>
            </form>
        </div>
        </>
    )
}


export default UpdateReview
