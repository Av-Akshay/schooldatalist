import { v4 as uuidv4 } from "uuid";

const initialState = {
  dataList: [],
  activeId: null,
  editListId: "",
  editSchoolId: "",
};

const addSchoolData = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SCHOOL":
      if (action.payload === "") {
        alert("please enter the school name");
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          dataList: [
            ...state.dataList,
            {
              schoolobj: { schoolName: action.payload, id: uuidv4(), list: [] },
            },
          ],
        };
      }
    case "ADD_ID":
      return {
        ...state,
        activeId: action.payload,
      };

    case "STUDENT_INFO":
      if (
        action.payload.name === "" ||
        action.payload.address === "" ||
        action.payload.category === "" ||
        action.payload.class === ""
      ) {
        alert("please filled the all input filds first");
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          dataList: state.dataList.map((curElem) =>
            curElem.schoolobj.id === state.activeId
              ? {
                  ...curElem,
                  schoolobj: {
                    ...curElem.schoolobj,
                    list: [...curElem.schoolobj.list, action.payload],
                  },
                }
              : curElem
          ),
        };
      }
    case "DELETE_LIST_ITEM":
      return {
        ...state,
        dataList: state.dataList.map((curElem) =>
          curElem.schoolobj.id === state.activeId
            ? {
                ...curElem,
                schoolobj: {
                  ...curElem.schoolobj,
                  list: curElem.schoolobj.list.filter(
                    (item) => item.id !== action.payload
                  ),
                },
              }
            : curElem
        ),
      };
    case "EDIT_DATA":
      return {
        ...state,
        editListId: action.payload,
      };
    case "ADD_EDIT_ITEM":
      return {
        ...state,
        // TODO => refactor code
        dataList: state.dataList.map((curElem) =>
          curElem.schoolobj.id === state.activeId
            ? {
                ...curElem,
                schoolobj: {
                  ...curElem.schoolobj,
                  list: curElem.schoolobj.list.map((curItem) =>
                    curItem.id === state.editListId ? action.payload : curItem
                  ),
                },
              }
            : curElem
        ),
      };
    case "DELETE_SCHOOL":
      return {
        ...state,
        // TODO=> optimize
        dataList: state.dataList.filter(
          (elem) => elem.schoolobj.id !== action.payload
        ),
        activeId: state.activeId === action.payload ? null : state.activeId,
      };
    case "SCHOOL_ID":
      return {
        ...state,
        editSchoolId: action.payload,
      };
    case "ADD_EDIT_SCHOOL":
      return {
        ...state,
        // TODO=> optimize
        dataList: state.dataList.map((curElem) =>
          curElem.schoolobj.id === state.editSchoolId
            ? {
                ...curElem,
                schoolobj: { ...curElem.schoolobj, schoolName: action.payload },
              }
            : curElem
        ),
      };

    default:
      return state;
  }
};
export default addSchoolData;
