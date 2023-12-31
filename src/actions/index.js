export const addSchool = (data) => {
  return {
    type: "ADD_SCHOOL",
    payload: data,
  };
};

export const addId = (id) => {
  return {
    type: "ADD_ID",
    payload: id,
  };
};

export const addSchoolData = (items) => {
  return {
    type: "STUDENT_INFO",
    payload: items,
  };
};

export const deleteListItem = (id) => {
  return {
    // TODO => fix naming convension
    type: "DELETE_LIST_ITEM",
    payload: id,
  };
};

export const editData = (editListId) => {
  return {
    type: "EDIT_DATA",
    payload: editListId,
  };
};
export const addEditData = (editVal) => {
  return {
    type: "ADD_EDIT_ITEM",
    payload: editVal,
  };
};
export const deleteSchool = (schoolId) => {
  return {
    type: "DELETE_SCHOOL",
    payload: schoolId,
  };
};
export const editSchoolId = (schoolId) => {
  return {
    type: "SCHOOL_ID",
    payload: schoolId,
  };
};
export const addEditSchool = (editSchoolName) => {
  return {
    type: "ADD_EDIT_SCHOOL",
    payload: editSchoolName,
  };
};
