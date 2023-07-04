export const addSchool = (data)=>{
   return {
    type:"ADD_SCHOOL",
    payload:data
   }
};

export const addId = (id)=>{
    return{
        type:"ADD_ID",
        payload:id
    }
}

export const addSchoolData = (items)=>{
    return {
        type:"STUDENT_INFO",
        payload:items
    }
}

export const deleteListItem= (id)=>{
    return{
        type:"DELETE_list_item",
        payload:id
    }
};

export const editData = (editListId)=>{
    return{
        type:"EDIT_DATA",
        payload:editListId
    }
};
export const addEditData = (editVal)=>{
    return{
        type:"ADD_EDIT_ITEM",
        payload:editVal
    }
}