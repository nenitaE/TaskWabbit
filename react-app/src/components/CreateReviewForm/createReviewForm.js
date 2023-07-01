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

    // useEffect( () => {
    //     dispatch(getReviewForLoggedIn())
    // }, [dispatch])

    const sessionUser = useSelector( (state) => state.session.user.id)
    console.log(typeof(sessionUser), sessionUser, 'session//////////////')

    const sessiontest = useSelector( state => state)
    console.log(sessiontest, 'test---------')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            description,
            rating,
            user_id: sessionUser,
            tasker_id
        }

        let newReviewByUser = await dispatch(createNewReviewByUser(payload))
        dispatch(getReviewForLoggedIn())
        console.log(newReviewByUser, 'handle submit')

        if (newReviewByUser) {
            return history.push('/reviews/currentUser')
        }
    }

    return (
        <>
        <h1>Write a Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>How was the service?</h3>
                    <label>
                        Description:
                        <textarea
                            id='description'
                            placeholder="Your Review"
                            required
                            value={description}
                            type="text"
                            onChange={ e => setDescription(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <h3>Please give a rating</h3>
                    <label>
                        Rating:
                        <input
                            id='rating'
                            required
                            placeholder="Rating"
                            value={rating}
                            type="integer"
                            onChange={ e => setRating(e.target.value)}
                            />
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
