//constants
const GET_REVIEW_FOR_LOGGEDIN = 'taskwabbit/getReviewForLoggedIn'
const  CREATE_NEW_REVIEW = 'taskwabbit/createNewReview'
const GET_REVIEW_BY_ID = 'taskwabbit/getReviewById'
const DELETE_REVIEW = 'taskwabbit/getDeleteReview'
const GET_REVIEW_BY_TASKER = 'taskwabbit/getReviewByTasker'

//func
const reviewLoggedIn = (reviews) => {
    console.log('TEST--------------')
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
        // console.log(loadReviews, 'Thunk Response')

        dispatch(reviewLoggedIn(loadReviews))

        return loadReviews
    }
}

export const createNewReviewByUser = (payload) => async (dispatch) => {
    console.log(payload, 'payload Thunk')
    const response = await fetch('/api/taskers/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log(response, 'Response')
    console.log(response.body, 'BODY')

    if(response.ok){
        const newRev= await response.json()

        console.log(newRev, 'newRev------')
        dispatch(createReview(newRev))

        return newRev
    } else console.log('wrong')
}

export const getRevById = (id) => async (dispatch) => {
    console.log(id, 'id')
    const response = await fetch(`/api/reviews/${id}`)

    console.log(response, 'getRev resp')

    if(response.ok){
        const review = await response.json()
        console.log(review)

        dispatch(reviewById(review))
        return review
    }
}

export const updateReview = (payload, id) => async (dispatch) => {
    console.log(payload, 'payload in updateRev')

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const updatedRev = await response.json()
        console.log(updatedRev.Review[0], 'updatedRev')

        dispatch(createReview(updatedRev.Review[0]))

        return updatedRev
    }
}

export const delReviewById = (id) => async (dispatch) => {

    console.log(id, typeof(id), 'test id')
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    console.log(response, 'thunk response delete')
    if(response.ok){
        const del = await response.json()
        console.log(del)

        dispatch(deleteRev(del))
    }
}

export const getReviewByTaskerId = (tasker_id) => async (dispatch) => {

    const response = await fetch(`/api/taskers/${tasker_id}/reviews`)

    console.log(response, 'response')

    if(response.ok){
        const revResponse = await response.json()
        console.log(revResponse, 'rev-----')

        dispatch(reviewByTaskerId(revResponse))
    }
}


//state
let initialState = {};

//reducer
const reviewReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_REVIEW_FOR_LOGGEDIN: {
            console.log("IN RECUDER STATE")
            const newState = {...state}
            const userRev = action.payload.Reviews
            // console.log(state, 'action----------')
            // console.log(userRev.payload.Reviews, 'Review ARRAY')
            userRev.forEach(rev => newState[rev.id] = rev)
            // console.log(newState, "newSTATE")
            // console.log(newState, 'testing get')
            return newState
        }
        case CREATE_NEW_REVIEW: {
            let newState = {}
            console.log(state, action, 'In state')
            console.log(action.newReview, 'newReview')
            newState = {...state}
            newState[action.newReview.id] = action.newReview
            console.log(newState, 'new----------------')
            return newState
        }
        case GET_REVIEW_BY_ID: {
            let newState = {...state}

            console.log(state, 'state=========')
            const rev = action.reviewById
            console.log(rev, 'rev--')

            newState[rev.id] = rev
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}

            console.log(action.rev.id, newState, 'del action')

            delete newState[action.rev.id]

            return newState
        }
        case GET_REVIEW_BY_TASKER:{
            const newState = {}
            console.log(action.taskerReview.Reviews, 'review by tasker')
            let revArr = action.taskerReview.Reviews

            revArr.forEach(rev => newState[rev.id] = rev)
            console.log(newState, 'newState')

            return newState
        }
        default:
            return state
    }
}


export default reviewReducer
