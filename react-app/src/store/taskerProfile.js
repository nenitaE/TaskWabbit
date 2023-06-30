// constants

//TASKERPROFILE ACTION TYPES

    //GET all tasktypes of curr tasker
const GET_TASKERTASKTYPES = "taskertasktypes/getTaskerTaskTypes";
    //DELETE a tasktype of curr user
const DELETE_TASKERTASKTYPE = "taskertasktypes/deleteTaskerTaskType";
    //EDIT a tasktype of curr user
const UPDATE_TASKERTASKTYPE = "taskertasktypes/updateTaskerTaskType"
    //CREATE a tasktype for curr user
const CREATE_TASKERTASKTYPE = "taskertasktypes/createTaskerTaskType"

//TASKERPROFILE ACTION CREATORS

const getTaskerTaskTypesAction = (taskerTaskTypes) => {
    console.log('*********taskerTaskTypes*********', taskerTaskTypes)
    return{
        type: GET_TASKERTASKTYPES,
        payload: taskerTaskTypes
    }
}

const deleteTaskerTaskTypeAction = (taskertasktypeId) => ({
    type: DELETE_TASKERTASKTYPE,
    payload:taskertasktypeId
})

const updateTaskerTaskTypeAction = (taskertasktypeId) => ({
    type:UPDATE_TASKERTASKTYPE,
    payload: taskertasktypeId
})

const createTaskerTaskTypeAction = (newTaskerTaskType) => ({
    type: CREATE_TASKERTASKTYPE,
    payload: newTaskerTaskType
})

//TASKERPROFILE THUNK ACTIONS
export const getTaskerTaskTypes = () => async(dispatch) => {
    const response = await fetch('/api/taskerTaskTypes/current');
    if(response.ok){
        const data = await response.json();
        console.log(data, "***********data***********")
        dispatch(getTaskerTaskTypesAction(data.TaskerTaskTypes))
    }
}

export const updateTaskerTaskType = (taskertasktypeId, taskerTaskTypeData) => async(dispatch) =>{
    const response = await fetch(`/api/taskerTaskType/${taskertasktypeId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskerTaskTypeData)
    })
    if(response.ok){
        const updatedTaskerTaskType = await response.json();
        dispatch(updateTaskerTaskTypeAction(updatedTaskerTaskType));
        console.log('*****UPDATED TASKERTASKTYPE****', updatedTaskerTaskType)
        return updatedTaskerTaskType;
    }else if (response.status < 500){
        console.log("BACKEND UPDATE FAILED")

        const data = response.json();
        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const deleteTaskerTaskType = (taskerTaskTypeId) => async(dispatch) => {
    const response = await fetch(`/api/taskerTaskType/${taskerTaskTypeId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteTaskerTaskTypeAction(taskerTaskTypeId))
        return null
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors;
        }
    }else {
        return ('An error occurred. Please try again')
    }
}


export const createTaskerTaskType = (taskerTaskTypeData) => async(dispatch) =>{
    try {
        console.log("FAILED BODY", JSON.stringify(taskerTaskTypeData))
        const response = await fetch('/api/taskerTaskTypes', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskerTaskTypeData)
        });
        if(response.ok){
            const newTaskerTaskType = await response.json();
            dispatch(createTaskerTaskTypeAction(newTaskerTaskType));
            return newTaskerTaskType
        } else if (response.status <= 500){
            console.log("FAILED BODY", JSON.stringify(taskerTaskTypeData))
            const data = await response.json();
            if(data.errors){
                return data.errors;
            }
        }else {
            return ('An error occurred. Please try again')
        }
    } catch (error) {
        console.error('Network error: ', error);
        return error;
    }
}

//TASKERPROFILE REDUCER

const initialState = {
    taskerTaskTypes: null
}

export default function taskerProfileReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        case GET_TASKERTASKTYPES:
            return{
                ...state,
                taskerTaskTypes: action.payload
            }
        case CREATE_TASKERTASKTYPE:
            return {
                ...state,
                taskerTaskType: [...state.taskerTaskTypes, action.payload]
            }
        case UPDATE_TASKERTASKTYPE:
            return {
                ...state,
                taskerTaskType:[...state.taskerTaskTypes, action.payload.id]
            }
        case DELETE_TASKERTASKTYPE:
            newState = {...state};
            delete newState[action.payload.id];
            return newState;
        default:
            return state
    }
}
