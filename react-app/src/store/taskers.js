// constants
const SET_TASKERS = "taskers/SET_TASKERS";

const setTaskers = (taskers) => ({
    type: SET_TASKERS,
    payload: taskers
})

const initialState = {}

export const getTaskers = () => async(dispatch) => {
    const response = await fetch('/api/taskers/');
    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(setTaskers(data.Taskers))
    }
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_TASKERS:
			return {
                ...state,
                taskers: action.payload
            };
		default:
			return state;
	}
}
