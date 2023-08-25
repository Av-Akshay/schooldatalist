import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { useSchool } from "./hooks/school";
import {
  addId,
  deleteListItem,
  editData,
  deleteSchool,
  editSchoolId,
} from "./actions";

const App = () => {
  const {
    submitListForm,
    submitForm,
    inputValue,
    toggleBtn,
    setToggleBtn,
    allInfo,
    setAllInfo,
    addSchoolName,
    setaddSchoolName,
    addBtn,
    setAddBtn,
    data,
    dispatch,
    listItem,
  } = useSchool();

  return (
    <div className="box">
      <div className="container">
        <div className="add-school">
          <h1 className="heading">Add school</h1>
          <form className="schoolForm" onSubmit={submitForm}>
            <input
              onChange={(event) => setaddSchoolName(event.target.value)}
              name="school"
              value={addSchoolName}
              placeholder="Add School"
            />
            {addBtn ? (
              <button className="btn" type={onsubmit}>
                +
              </button>
            ) : (
              <button type="onsubmit">
                {" "}
                <AiOutlineEdit className="editicon" />
              </button>
            )}
          </form>
        </div>
        <div className="school-data-list">
          <ul className="school-list">
            {data?.dataList?.map((curElem, index) => {
              return (
                <div key={index} className="schholListitem">
                  <li
                    className={
                      data.activeId === curElem?.schoolobj?.id
                        ? "schoolList active"
                        : "schoolList"
                    }
                    onClick={() => dispatch(addId(curElem?.schoolobj?.id))}
                  >
                    {curElem?.schoolobj?.schoolName}
                  </li>
                  <div className="school-list-icons">
                    <AiOutlineEdit
                      className="editicon"
                      onClick={() => {
                        setAddBtn(false);
                        setaddSchoolName(curElem.schoolobj.schoolName);
                        dispatch(editSchoolId(curElem.schoolobj.id));
                      }}
                    />{" "}
                    <AiOutlineDelete
                      className="deleteicon"
                      onClick={() => {
                        dispatch(deleteSchool(curElem?.schoolobj?.id));
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <hr></hr>

      {data.activeId ? (
        <div className="listSection">
          <div className="heading">
            <h1>School List Details</h1>
          </div>
          <form onSubmit={submitListForm}>
            <div className="inputFilds">
              <input
                type="text"
                name="name"
                onChange={inputValue}
                value={allInfo.name}
                placeholder="Enter Your Name"
              />
              <input
                type="text"
                name="address"
                onChange={inputValue}
                value={allInfo.address}
                placeholder="Enter Your Addrees"
              />
              <input
                name="class"
                onChange={inputValue}
                value={allInfo.class}
                placeholder="Add Class"
              />
              <div>
                <label> Gender:-</label>
                <input
                  type="radio"
                  onChange={inputValue}
                  checked={allInfo.category === "male"}
                  id="html"
                  name="category"
                  value="male"
                />
                <label>Male</label>
                <input
                  type="radio"
                  onChange={inputValue}
                  checked={allInfo.category === "female"}
                  id="css"
                  name="category"
                  value="female"
                />
                <label>female</label>
              </div>
              <div className="toogleBtn">
                {toggleBtn ? (
                  <button className="btn" type="submit">
                    Submit Data
                  </button>
                ) : (
                  <button className="togglebtn " type="onsubmit">
                    <AiOutlineEdit />
                  </button>
                )}
              </div>
            </div>
          </form>

          <table className="table" border={1}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Addrees</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listItem?.map((curElem, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{curElem.name}</td>
                    <td>{curElem.address}</td>
                    <td>{curElem.category}</td>
                    <td>{curElem.class}</td>
                    <td>
                      <button
                        className="listBtn"
                        onClick={() => {
                          setAllInfo({
                            name: curElem.name,
                            address: curElem.address,
                            class: curElem.class,
                            category: curElem.category,
                          });
                          setToggleBtn(false);
                          dispatch(editData(curElem.id));
                        }}
                      >
                        <AiOutlineEdit className="editicon" />
                      </button>
                      <button
                        className="listBtn"
                        onClick={() => {
                          dispatch(deleteListItem(curElem.id));
                        }}
                      >
                        <AiOutlineDelete className="deleteicon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="toggleHeading heading">
          First Add And Then Select The School For Adding The Student Data
        </h1>
      )}
    </div>
  );
};
export default App;
