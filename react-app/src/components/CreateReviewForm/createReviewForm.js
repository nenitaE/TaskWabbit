import { useEffect, useState } from "react";
import { createNewReviewByUser, getReviewForLoggedIn } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const CreateReviewForm = () => {

    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [tasker_id, setTasker_id] = useState('')
    const [validation, setValidation] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect( () => {
        dispatch(getReviewForLoggedIn())
    }, [dispatch])

    const sessionUser = useSelector( (state) => state.session.user.id)
    console.log(typeof(sessionUser), sessionUser, 'session//////////////')

    const sessiontest = useSelector( state => state)
    console.log(sessiontest, 'test---------')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {}
        if(description.length < 5) errors['description'] = 'Review requires atleast 5 characters'
        if(rating < 1 || rating > 5) errors['rating'] = 'Rating must be between 1 and 5'

        if(Object.values(errors).length){
            setValidation(errors)
            return alert('can not submit')
        }

        const payload = {
            description,
            rating,
            user_id: sessionUser,
            tasker_id
        }

        let newReviewByUser = await dispatch(createNewReviewByUser(payload))
        console.log(newReviewByUser, 'handle submit')

        if (newReviewByUser) {
            return history.push('/reviews/currentUser')
        }

        setValidation({})
    }

    return (
        <>
        <h1>Write a Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>How was the service?</h3>
                    <label>
                        <textarea
                            id='description'
                            placeholder="Please describe your experience"
                            required
                            value={description}
                            type="text"
                            onChange={ e => setDescription(e.target.value)}/>
                            {
                                validation.description && (
                                    <div style={{color: 'red'}}
                                    >{validation.description}</div>
                                )
                            }
                    </label>
                </div>
                <div>
                    <h3>Please give a rating</h3>
                    <label>
                        <input
                            id='rating'
                            required
                            placeholder="Rate between 1 & 5"
                            value={rating}
                            type="integer"
                            onChange={ e => setRating(e.target.value)}
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
                    <h3>tasker id(needs work)</h3>
                    <label>
                        tasker_id:
                    <input
                        required
                        placeholder="tasker_id"
                        value={tasker_id}
                        type="integer"
                        onChange={ e => setTasker_id(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Post Your Review</button>
                </div>
            </form>
        </>
    )
}

export default CreateReviewForm
