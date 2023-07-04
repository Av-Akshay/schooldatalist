import { v4 as uuidv4} from 'uuid';
const initialState = {
    list:[],
    schoolB:[],
    schoolC:[],
    editList:[]
};
const addInfoData = (state = initialState, Action)=>{
    switch(Action.type){
        case "ADD_INFORMATION":
            console.log(Action.payload.school)
            if(Action.payload.school==="SchoolA"){
                return{
                    ...state,
                    list:[...state.list,{id:uuidv4(),...Action.payload}]
                };
            }else if(Action.payload.school==="SchoolB"){
                return{
                    ...state,
                    schoolB:[...state.schoolB,{id:uuidv4(),...Action.payload}]
                };
            }else if(Action.payload.school==="SchoolC"){
                return{
                    ...state,
                    schoolC:[...state.schoolC,{id:uuidv4(),...Action.payload}]
                };
            }
        break ;
            
        case "DELETE_DATA":
           const {id,school}=Action.payload;

           if(school==="SchoolA"){
            return {
                ...state,
                list:state.list.filter((curElem)=>{
                    return curElem.id!==id;
                })
            };
        }else if(school==="SchoolB"){
            return {
                ...state,
                schoolB:state.schoolB.filter((curElem)=>{
                    return curElem.id!==id;
                })
            };
        }else if(school==="SchoolC"){
            return {
                ...state,
                schoolC:state.schoolC.filter((curElem)=>{
                    return curElem.id!==id;
                })
            };
        }
        break ;
        case "EDIT_DATA":
            console.log(Action.payload)
            return{
                ...state,
                editList:Action.payload
            }
        case "ADD_EDIT_DATA":
            
            if(Action.payload.school==="SchoolA"){
                const addEditValue = state.list.map((curVal)=>{
                    if(curVal.id===state.editList.id){
                        return {
                            ...Action.payload,
                            ...state.editList.id
                        }
                    }else{
                        return( curVal);
                    } 
                })
                return{
                      ...state,
                      list:addEditValue
                }    
            }else if(Action.payload.school==="SchoolB"){
                const addEditValue = state.schoolB.map((curVal)=>{
                    if(curVal.id===state.editList.id){
                        return {
                            ...Action.payload,
                            ...state.editList.id
                        }
                    }else{
                        return( curVal);
                    } 
                })
                return{
                      ...state,
                      schoolB:addEditValue
                }    
            }else if(Action.payload.school==="SchoolC"){
                const addEditValue = state.schoolC.map((curVal)=>{
                    if(curVal.id===state.editList.id){
                        return {
                            ...Action.payload,
                            ...state.editList.id
                        }
                    }else{
                        return( curVal);
                    } 
                })
                return{
                      ...state,
                      schoolC:addEditValue
                }    
            };
            break ;
           
        default: return state;
    }
    
};
export default addInfoData;