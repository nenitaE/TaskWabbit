import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import EditTaskerTaskTypeForm from "../EditTaskerTaskTypeForm";
import { getTaskerTaskType } from "../../store/taskerProfile";

const UpdateTaskerTaskTypeForm = () => {
    const { taskerTaskTypeId } = useParams();
    console.log(taskerTaskTypeId, "*********taskerTaskType.Id in Update Form*********")

    // const taskerTaskTypesArr = useSelector((state) => state.taskerProfile)
    // // const taskerTaskType = useSelector((state) => state.taskerProfile.taskerTaskTypes[taskerTaskType.taskType_id])
    // console.log(taskerTaskTypesArr, "*********taskerTaskTypeArr inside UPDATEForm*********")
    
    // const taskerTaskTypesObj = {}
    // taskerTaskTypesArr.forEach((taskerTaskType) => {taskerTaskTypesObj[taskerTaskType.taskType_id] = taskerTaskType});
    // const taskerTaskType = taskerTaskTypesObj[taskerTaskTypeId]
    
    //Get taskerTaskType by Id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskerTaskType(taskerTaskTypeId))
    }, [dispatch, taskerTaskTypeId]);

    const taskerTaskType = useSelector((state) => state.taskerProfile);
    console.log("*********TASKERTASKTYPE IN UPDATE FORM", taskerTaskType)

    // const taskerTaskTypes = Object.values(useSelector(state => state.taskerTaskTypes))
    // console.log(taskerTaskTypes, "******taskerTaskTypes********")

    return (
      <EditTaskerTaskTypeForm taskerTaskType={taskerTaskType} formType="Update Hourly Rate" />
      // <h1>Edit Form Lives here</h1>
    );
}

export default UpdateTaskerTaskTypeForm;