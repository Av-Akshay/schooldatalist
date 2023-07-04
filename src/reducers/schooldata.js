import { v4 as uuidv4} from 'uuid';
const initialState={
    dataList:[],
    activeId:"",
    editListId:""
}
const addSchoolData = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_SCHOOL":

        return {
            ...state,
            dataList:[...state.dataList,{schoolobj:{schoolName:action.payload,id:uuidv4(),list:[]}}]
           
        };
        case "ADD_ID":
            return{
                 ...state,
                 activeId:action.payload
            };

        case "STUDENT_INFO":
         return {
                 ...state, 
                 dataList: state.dataList.map((curElem)=>{
                    if(curElem.schoolobj.id===state.activeId){
                       return {
                        ...curElem,
                        schoolobj:{...curElem.schoolobj,list:[...curElem.schoolobj.list,action.payload]}
                       }
                    }else{
                        return curElem
                    }
                 })
            };
        case "DELETE_list_item":
            return{
                ...state, 
                dataList: state.dataList.map((curElem)=>{
                   if(curElem.schoolobj.id===state.activeId){
                      return {
                       ...curElem,
                       schoolobj:{...curElem.schoolobj,list:curElem.schoolobj.list.filter((item)=>{
                        return item.id !== action.payload;
                       })}
                      }
                   }else{
                       return curElem
                   }
                })
            };
            case "EDIT_DATA":
                return {
                    ...state,
                    editListId:action.payload
                };
            case 'ADD_EDIT_ITEM':
                return{
                    ...state, 
                    dataList: state.dataList.map((curElem)=>{
                       if(curElem.schoolobj.id===state.activeId){
                          return {
                           ...curElem,
                           schoolobj:{...curElem.schoolobj,list:curElem.schoolobj.list.map((curItem)=>{
                                if(curItem.id === state.editListId){
                                    return action.payload
                                }else{
                                    return curItem;
                                }
                           })}
                          }
                       }else{
                           return curElem
                       }
                    })
                }
          
           
        default: return state;
    }
}
export default addSchoolData;