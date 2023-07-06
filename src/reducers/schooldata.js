import { v4 as uuidv4 } from 'uuid';
const initialState = {
    dataList: [],
    activeId: null,
    editListId: "",
    editSchoolId: ""
}
const addSchoolData = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SCHOOL":
            return {
                ...state,
                dataList: [...state.dataList, { schoolobj: { schoolName: action.payload, id: uuidv4(), list: [] } }],
            };
        case "ADD_ID":
            return {
                ...state,
                activeId: action.payload
            };

        case "STUDENT_INFO":
            return {
                ...state,
                dataList: state.dataList.map((curElem) => {
                    if (curElem.schoolobj.id === state.activeId) {
                        return {
                            ...curElem,
                            schoolobj: { ...curElem.schoolobj, list: [...curElem.schoolobj.list, action.payload] }
                        }
                    } else {
                        return curElem
                    }
                })
            };
        case "DELETE_list_item":
            return {
                ...state,
                dataList: state.dataList.map((curElem) => {
                    if (curElem.schoolobj.id === state.activeId) {
                        return {
                            ...curElem,
                            schoolobj: {
                                ...curElem.schoolobj, list: curElem.schoolobj.list.filter((item) => {
                                    return item.id !== action.payload;
                                })
                            }
                        }
                    } else {
                        return curElem
                    }
                })
            };
        case "EDIT_DATA":
            return {
                ...state,
                editListId: action.payload
            };
        case 'ADD_EDIT_ITEM':
            return {
                ...state,
                dataList: state.dataList.map((curElem) => {
                    if (curElem.schoolobj.id === state.activeId) {
                        return {
                            ...curElem,
                            schoolobj: {
                                ...curElem.schoolobj, list: curElem.schoolobj.list.map((curItem) => {
                                    if (curItem.id === state.editListId) {
                                        return action.payload
                                    } else {
                                        return curItem;
                                    }
                                })
                            }
                        }
                    } else {
                        return curElem
                    }
                })
            };
        case "DELETE_SCHOOL":

            let flag = false;
            state.dataList.forEach((elem) => {
                if (elem.schoolobj.id === action.payload) {
                    flag = true;
                } else if (elem.schoolobj.id !== action.payload) {
                    flag = false
                }
            })

            return {
                ...state,
                dataList: state.dataList.filter((elem) => {
                    return elem.schoolobj.id !== action.payload
                }),
                activeId: flag ? null : state.activeId
            };
        case "SCHOOL_ID":
            return {
                ...state,
                editSchoolId: action.payload

            };
        case "ADD_EDIT_SCHOOL":
            return {
                ...state,
                dataList: state.dataList.map((curElem) => {
                    if (curElem.schoolobj.id === state.editSchoolId) {
                        return {
                            ...curElem,
                            schoolobj: { ...curElem.schoolobj, schoolName: action.payload }
                        }
                    } else {
                        return curElem;
                    }
                })
            }


        default: return state;
    }
}
export default addSchoolData;