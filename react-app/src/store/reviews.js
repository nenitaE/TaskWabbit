//constants
const GET_REVIEW_FOR_LOGGEDIN = 'taskwabbit/getReviewForLoggedIn'
const  CREATE_NEW_REVIEW = 'taskwabbit/createNewReview'

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

//thunk
export const getReviewForLoggedIn = () => async (dispatch) => {
    console.log('getReviewForLoggedIn THUNK')
    const response = await fetch('/api/reviews/current')
    console.log(response, 'res in thunk Review')

    if(response.ok){
        const loadReviews = await response.json()
        console.log(loadReviews, 'Thunk Response')

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


//state
const initialState = {};

//reducer
const reviewReducer = (state = initialState, action) => {
    console.log('switch------')
    switch(action.type){
        case GET_REVIEW_FOR_LOGGEDIN: {
            console.log("IN RECUDER STATE")
            const newState = {}
            const userRev = action.payload.Reviews
            console.log(userRev, 'action----------')
            // console.log(userRev.payload.Reviews, 'Review ARRAY')
            userRev.forEach(rev => newState[rev.id] = rev)
            console.log(newState, "newSTATE")
            return state = {...newState}
        }
        case CREATE_NEW_REVIEW: {
            let newState = {}
            console.log(state, action, 'In state')
            console.log(action.newReview, 'newReview')
            return newState
        }
        default:
            return state
    }
}


export default reviewReducer
