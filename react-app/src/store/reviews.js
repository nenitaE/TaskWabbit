//constants
const GET_REVIEW_FOR_LOGGEDIN = 'taskwabbit/getReviewForLoggedIn'
const  CREATE_NEW_REVIEW = 'taskwabbit/createNewReview'
const GET_REVIEW_BY_ID = 'taskwabbit/getReviewById'
const DELETE_REVIEW = 'taskwabbit/getDeleteReview'
const GET_REVIEW_BY_TASKER = 'taskwabbit/getReviewByTasker'

//func
const reviewLoggedIn = (reviews) => {
    return {
        type: GET_REVIEW_FOR_LOGGEDIN,
        payload: reviews
    }
}

const createReview = newReview => {
    return {
        type: CREATE_NEW_REVIEW,
        newReview
    }
}

const reviewById = reviewById => {
    return {
        type: GET_REVIEW_BY_ID,
        reviewById
    }
}

const deleteRev = rev => {
    return{
        type: DELETE_REVIEW,
        rev
    }
}

const reviewByTaskerId = taskerReview => {
    return{
        type: GET_REVIEW_BY_TASKER,
        taskerReview
    }
}

//thunk
export const getReviewForLoggedIn = () => async (dispatch) => {

    const response = await fetch('/api/reviews/current')
    

    if(response.ok){
        const loadReviews = await response.json()

        dispatch(reviewLoggedIn(loadReviews))

        return loadReviews
    }
}

export const createNewReviewByUser = (payload) => async (dispatch) => {
    
    const response = await fetch('/api/taskers/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const newRev= await response.json()

        dispatch(createReview(newRev))

        return newRev
    } else {
        return ('An error occurred. Please try again')
    }
}

export const getRevById = (id) => async (dispatch) => {
   
    const response = await fetch(`/api/reviews/${id}`)
    if(response.ok){
        const review = await response.json()

        dispatch(reviewById(review))
        return review
    }
}

export const updateReview = (payload, id) => async (dispatch) => {
   
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const updatedRev = await response.json()

        dispatch(createReview(updatedRev.Review[0]))

        return updatedRev
    }
}

export const delReviewById = (id) => async (dispatch) => {

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        const del = await response.json()
        dispatch(deleteRev(del))
    }
}

export const getReviewByTaskerId = (tasker_id) => async (dispatch) => {

    const response = await fetch(`/api/taskers/${tasker_id}/reviews`)


    if(response.ok){
        const revResponse = await response.json()

        dispatch(reviewByTaskerId(revResponse))
    }
}


//state
let initialState = {};

//reducer
const reviewReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_REVIEW_FOR_LOGGEDIN: {
            const newState = {}
            const userRev = action.payload.Reviews
           userRev.forEach(rev => newState[rev.id] = rev)
            return newState
        }
        case CREATE_NEW_REVIEW: {
            let newState = {}
            newState = {...state}
            newState[action.newReview.id] = action.newReview
            return newState
        }
        case GET_REVIEW_BY_ID: {
            let newState = {}
            
            const rev = action.reviewById

            newState[rev.id] = rev
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}

            delete newState[action.rev.id]

            return newState
        }
        case GET_REVIEW_BY_TASKER:{
            const newState = {}
            let revArr = action.taskerReview.Reviews

            revArr.forEach(rev => newState[rev.id] = rev)

            return newState
        }
        default:
            return state
    }
}


export default reviewReducer
