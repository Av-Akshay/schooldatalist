import React, { useState } from "react";
import { addSchool, addSchoolData, addId, deleteListItem, editData, addEditData, deleteSchool, editSchoolId, addEditSchool } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


const School = () => {
   const [addschoolName, setaddSchoolName] = useState("");
   const [addbtn, setaddbtn] = useState(true);
   const [toggleBtn, settoggleBtn] = useState(true);
   const [allInfo, setallInfo] = useState({
      name: "",
      address: "",
      class: "",
      category: ""
   });
   const dispatch = useDispatch();

   const data = useSelector((store) => store.addSchoolData);
   console.log(data);
   const fatchingData = data.dataList.filter((item) => {
      return item?.schoolobj?.id === data.activeId;
   });
   const listItem = fatchingData[0]?.schoolobj?.list
   // console.log(listItem);
   console.log("data.activeId", data.activeId);

   const inputValue = (event) => {
      const { name, value } = event.target;
      setallInfo((olddata) => {
         return {
            ...olddata,
            [name]: value
         }
      })
   }
   const submitForm = (event) => {
      event.preventDefault();
      if (addbtn === true) {
         dispatch(addSchool(addschoolName)); setaddSchoolName("")
      } else {
         setaddSchoolName(""); setaddbtn(true); dispatch(addEditSchool(addschoolName))
      }
   };
   const submitListForm = (event) => {
      event.preventDefault();
      if (toggleBtn === true) {
         dispatch(addSchoolData({ ...allInfo, id: uuidv4() })); setallInfo({ name: "", address: "", class: "", category: "" })
      } else {
         settoggleBtn(true); dispatch(addEditData(allInfo)); setallInfo({ name: "", address: "", class: "", category: "" })
      }
   }


   return (
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
         <div>
            <h1>Add school</h1>
            <form onSubmit={submitForm} style={{ display: "flex", gap: "0.5rem" }}>
               <input onChange={(event) => setaddSchoolName(event.target.value)} name="school" value={addschoolName} placeholder="Add School" />
               {(addbtn) ? <button className="btn" type={onsubmit}>+</button> : <button type="onsubmit"> <AiOutlineEdit style={{ color: "green" }} /></button>}

            </form>
            <div>
               <ul>
                  {data?.dataList?.map((curElem) => {
                     console.log(curElem);
                     return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                           <li className={data.activeId === curElem?.schoolobj?.id ? "schoolList active" : "schoolList"} onClick={() => dispatch(addId(curElem?.schoolobj?.id))}>{curElem?.schoolobj?.schoolName}</li>
                           <div style={{ display: "flex", fontSize: "1.3rem" }}>
                              <AiOutlineEdit className="editicon" onClick={() => { setaddbtn(false); setaddSchoolName(curElem.schoolobj.schoolName); dispatch(editSchoolId(curElem.schoolobj.id)) }} style={{ color: "green" }} /> <AiOutlineDelete className="deleteicon" onClick={() => { dispatch(deleteSchool(curElem?.schoolobj?.id)) }} style={{ color: "red" }} />
                           </div>
                        </div>
                     )
                  })}
               </ul>
            </div>
         </div>
         {(data.activeId) ?

            <div style={{ width: "100%" }}>

               <div style={{ margin: "0 auto", width: "90%" }}>
                  <h1>School List Details</h1>
               </div>
               <form onSubmit={submitListForm}>
                  <div style={{ display: "flex", height: "auto", width: "90%", justifyContent: "space-between", margin: "0 auto", alignItems: "center" }}>

                     <input type='text' name="name" onChange={inputValue} value={allInfo.name} placeholder='Enter Your Name' />
                     <input type='text' name="address" onChange={inputValue} value={allInfo.address} placeholder='Enter Your Addrees' />
                     <select name="class" onChange={inputValue} value={allInfo.class}>
                        <option>select the class</option>
                        <option>5th</option>
                        <option>6th</option>
                        <option>7th</option>
                        <option>8th</option>
                        <option>9th</option>
                        <option>10th</option>
                        <option>11th</option>
                        <option>12th</option>
                     </select>
                     <div>
                        <label> Gender:-</label>
                        <input type="radio" onChange={inputValue} checked={allInfo.category === "male"} id="html" name="category" value="male" />
                        <label>Male</label>
                        <input type="radio" onChange={inputValue} checked={allInfo.category === "female"} id="css" name="category" value="female" />
                        <label>female</label>
                     </div>
                     <div style={{ display: "flex", alignItems: "center" }}>

                        {toggleBtn ? <button className="btn" type="submit" >Submit Data</button>
                           :
                           <button className="togglebtn " type="onsubmit"><AiOutlineEdit /></button>
                        }
                     </div>
                  </div>
               </form>



               <table border={1} style={{ width: "90%", margin: "1rem auto" }}>
                  <tr>
                     <th>S.No.</th>
                     <th>Name</th>
                     <th>Addrees</th>
                     <th>Gender</th>
                     <th>Class</th>
                     <th>Action</th>
                  </tr>
                  {
                     listItem?.map((curElem, index) => {
                        return (
                           <tr>
                              <td>{index + 1}</td>
                              <td>{curElem.name}</td>
                              <td>{curElem.address}</td>
                              <td>{curElem.category}</td>
                              <td>{curElem.class}</td>
                              <td><button style={{ border: "none", background: "white" }} onClick={() => { setallInfo({ name: curElem.name, address: curElem.address, class: curElem.class, category: curElem.category }); settoggleBtn(false); dispatch(editData(curElem.id)) }}><AiOutlineEdit className="editicon" style={{ color: "green", fontSize: "1rem" }} /></button>
                                 <button style={{ border: "none", background: "white" }} onClick={() => { dispatch(deleteListItem(curElem.id)) }} ><AiOutlineDelete className="deleteicon" style={{ color: "red", fontSize: "1rem" }} /></button></td>
                           </tr>

                        )
                     })
                  }
               </table>
            </div>

            : <h1 style={{ width: "100%", display: "flex", justifyContent: "center", color: "blue" }}>First Add And Then Select The School For Adding The Student List</h1>}


      </div>
   )
};
export default School;