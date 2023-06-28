
//__________ACTION_TYPES____________
const LOAD_TASKERS = 'taskers/LOAD_TASKERS'


//___________ACTIONS_________________
const loadTaskers = (taskers) => ({
    type: LOAD_TASKERS,
    taskers,
});

//__________THUNK_ACTIONS______________
export const getTaskers = () => async dispatch => {
    const response = await fetch(`/api/taskers`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadTaskers(data.Taskers));
    }
}

//__________CREATE_INITIAL_STATE__________
const initialState = {};

//________TASKERS_REDUCER_________________
const taskersReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_TASKERS:
            action.taskers.forEach(tasker => {
                newState[tasker.id] = tasker;
            });
            return newState
        default:
            return state;
    }
}

export default taskersReducer;
