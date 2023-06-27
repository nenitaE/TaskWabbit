// constants
const SET_TASKS = "tasks/SET_TASKS";
const DELETE_TASK = "tasks/DELETE_TASK";

const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload:tasks
})

const deleteTaskAction = (taskId) => ({
    type: DELETE_TASK,
    payload:taskId
})

const initialState = {}

export const getTasks = () => async(dispatch) => {
    const response = await fetch('/api/tasks/current');
    if(response.ok){
        const data = await response.json();
        // console.log(data)
        dispatch(setTasks(data.tasks))
    }
}

export const deleteTask = (taskId) => async(dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteTaskAction(taskId))
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

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_TASKS:
            return{
                ...state,
                tasks: action.payload
            }
        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        default:
            return state
    }
}
