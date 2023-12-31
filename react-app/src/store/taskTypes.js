
//__________ACTION_TYPES____________
const LOAD_TASKTYPES = 'tasktypes/LOAD_TASKTYPES'


//___________ACTIONS_________________
const loadTaskTypes = (taskTypes) => ({
    type: LOAD_TASKTYPES,
    taskTypes,
});

//__________THUNK_ACTIONS______________
export const getTaskTypes = () => async dispatch => {
    const response = await fetch(`/api/tasktype`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadTaskTypes(data.TaskTypes));
    }
}

//__________CREATE_INITIAL_STATE__________
const initialState = [];

//________TASKTYPES_REDUCER_________________
const taskTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TASKTYPES:
            return action.taskTypes;
        default:
            return state;
    }
}

export default taskTypesReducer;
