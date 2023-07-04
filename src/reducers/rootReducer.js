import { combineReducers } from "redux";
import addInfoData from "./dataReducers";
import addSchoolData from "./schooldata";

const rootReducer = combineReducers({
    addInfoData,
    addSchoolData
});
export default rootReducer;