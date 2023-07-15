// constants
const SET_TASKS = "tasks/SET_TASKS";
const DELETE_TASK = "tasks/DELETE_TASK";
const SET_TASK = "tasks/SET_TASK";
const UPDATE_TASK = "tasks/UPDATE_TASK";
const CREATE_TASK = "tasks/CREATE_TASK";
const CLEAR_CURRENT_TASK = "CLEAR_CURRENT_TASK";

const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload:tasks
})

const deleteTaskAction = (taskId) => ({
    type: DELETE_TASK,
    payload:taskId
})

const setTask = (taskId) =>({
    type:SET_TASK,
    payload:taskId
})

const updateTaskAction = (task) => ({
    type:UPDATE_TASK,
    payload: task
})

const createTaskAction = (task) => ({
    type: CREATE_TASK,
    payload: task
})

export const clearCurrentTask = () => ({
    type: "CLEAR_CURRENT_TASK"
});



const initialState = {
    tasks: [],
    currentTask: null
}

export const getTasks = () => async(dispatch) => {
    const response = await fetch('/api/tasks/current');
    if(response.ok){
        const data = await response.json();
        // console.log(data)
        dispatch(setTasks(data.tasks))
    }
}

export const getTask = (taskId) => async(dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`)
    if(response.ok){
        const task = await response.json()
        dispatch(setTask(task))
    }
}

export const updateTask = (taskId, taskData) => async(dispatch) =>{
        // console.log("FAILED BODY", JSON.stringify(taskData))
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    if(response.ok){
        const updatedTask = await response.json();
        dispatch(updateTaskAction(updatedTask));
        return updatedTask;
    }else if (response.status < 500){
        const data = response.json();
        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const deleteTask = (taskId) => async(dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    })
    if(response.ok){
        await response.json();
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

// export const createTask = (taskData) => async(dispatch) =>{
//     console.log("FAILED BODY", JSON.stringify(taskData))
//     const response = await fetch('/api/tasks', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(taskData)
//     })
//     if(response.ok){
//         const newTask = await response.json();
//         dispatch(createTaskAction(newTask));
//         return newTask
//     } else if (response.status <= 500){
//         const data = response.json();
//         if(data.errors){
//             return data.errors;
//         }
//     }else {
//         return ('An error occurred. Please try again')
//     }
// }

export const createTask = (taskData) => async(dispatch) =>{
    // console.log("FAILED BODY", JSON.stringify(taskData))
    try {

        const response = await fetch('/api/tasks/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if(response.ok){
            const newTask = await response.json();
            // console.log(newTask, 'in my thunk, the response i get back')
            dispatch(createTaskAction(newTask));
            return newTask
        } else if (response.status <= 500){
            // console.log("FAILED BODY", JSON.stringify(taskData))
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


export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_TASKS:
            return{
                ...state,
                tasks: action.payload
            }
        case SET_TASK:
            return {
                ...state,
                currentTask: action.payload
            }
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case CLEAR_CURRENT_TASK:
            return { ...state, currentTask: null };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
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
