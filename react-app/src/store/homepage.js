// import { csrfFetch } from "./csrf"

//__________ACTION_TYPES____________
const LOAD_TASKTYPES = 'tasktypes/LOAD_TASKTYPES'

//___________ACTIONS_________________
const load = (taskTypes) => ({
    type: LOAD_TASKTYPES,
    payload:taskTypes
});

//__________THUNK_ACTIONS______________
export const getTaskTypes = () => async dispatch => {
    const response = await fetch(`/api/tasktype`);

    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.TaskTypes));
    }
}

//__________CREATE_INITIAL_STATE__________
const initialState = [];

//________GROUPS_REDUCER_________________
const taskTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TASKTYPES:
            return action.payload
        default:
            return state;
    }
}

export default taskTypesReducer;
