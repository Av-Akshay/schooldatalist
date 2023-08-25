import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import {
  addSchool,
  addSchoolData,
  addEditData,
  addEditSchool,
} from "../actions/index";

const initialState = {
  name: "",
  address: "",
  class: "",
  category: "",
};

export const useSchool = () => {
  const [addSchoolName, setaddSchoolName] = useState("");
  const [addBtn, setAddBtn] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [allInfo, setAllInfo] = useState(initialState);
  const dispatch = useDispatch();

  const data = useSelector((store) => store.addSchoolData);
  const fatchingData = data.dataList.filter((item) => {
    return item?.schoolobj?.id === data?.activeId;
  });
  const listItem = fatchingData[0]?.schoolobj?.list;

  const inputValue = (event) => {
    const { name, value } = event.target;
    setAllInfo((olddata) => {
      return {
        ...olddata,
        [name]: value,
      };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (addBtn === true) {
      dispatch(addSchool(addSchoolName));
      setaddSchoolName("");
    } else {
      setaddSchoolName("");
      setAddBtn(true);
      dispatch(addEditSchool(addSchoolName));
    }
  };

  const submitListForm = (event) => {
    event.preventDefault();
    if (toggleBtn === true) {
      dispatch(addSchoolData({ ...allInfo, id: uuidv4() }));
      setAllInfo(initialState);
    } else {
      setToggleBtn(true);
      dispatch(addEditData(allInfo));
      setAllInfo(initialState);
    }
  };
  return {
    submitListForm,
    submitForm,
    inputValue,
    addSchoolName,
    setaddSchoolName,
    addBtn,
    setAddBtn,
    toggleBtn,
    setToggleBtn,
    allInfo,
    setAllInfo,
    data,
    dispatch,
    listItem,
  };
};
