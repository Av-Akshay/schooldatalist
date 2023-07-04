import React, { useState } from "react";
import { addSchool, addSchoolData, addId, deleteListItem,editData, addEditData} from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { v4 as uuidv4} from 'uuid';


const School = () => {
   const [addschoolName, setaddSchoolName] = useState("");
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
      return item.schoolobj.id === data.activeId;
   });
   const listItem = fatchingData[0]?.schoolobj?.list
   console.log(listItem);

   const inputValue = (event) => {
      const { name, value } = event.target;
      setallInfo((olddata) => {
         return {
            ...olddata,
            [name]: value
         }
      })
   }


   return (
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
         <div>
            <h1>Add school</h1>
            <div style={{ display: "flex" }}>
               <input onChange={(event) => setaddSchoolName(event.target.value)} name="school" value={addschoolName} placeholder="Add School" />
               <button onClick={() => { dispatch(addSchool(addschoolName)); setaddSchoolName("") }}>+</button>
            </div>
            <div>
               <ul>
                  {data?.dataList?.map((curElem) => {
                     console.log(curElem);
                     return (
                     <div style={{display:"flex", alignItems:"center", fontSize:"1.5rem"}}>
                        <li className={data.activeId===curElem.schoolobj.id? "schoolList active": "schoolList"} onClick={() => dispatch(addId(curElem?.schoolobj?.id))}>{curElem?.schoolobj?.schoolName}</li>
                        <AiOutlineEdit/> <AiOutlineDelete/>
                        </div>
                        )
                  })}
               </ul>
            </div>
         </div>
         <div style={{ width: "100%" }}>
            <div style={{ margin: "0 auto", width: "90%" }}>
               <h1>School List Details</h1>
            </div>
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

                  {toggleBtn ? <button onClick={() => {
                     dispatch(addSchoolData({...allInfo,id:uuidv4()})); setallInfo({
                        name: "",
                        address: "",
                        class: "",
                        category: ""
                     })
                  }} >Submit Data</button> : <button onClick={() => { settoggleBtn(true); dispatch(addEditData(allInfo));setallInfo({
                        name: "",
                        address: "",
                        class: "",
                        category: ""
                     }) }}><AiOutlineEdit /></button>}


               </div>

            </div>
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
                           <td><button onClick={() => { setallInfo({ name: curElem.name,address: curElem.address,class: curElem.class,category: curElem.category});settoggleBtn(false); dispatch(editData(curElem.id))}}><AiOutlineEdit /></button>
                              <button onClick={()=>{dispatch(deleteListItem(curElem.id))}} ><AiOutlineDelete /></button></td>
                        </tr>

                     )
                  })
               }
            </table>
         </div>
      </div>
   )
};
export default School;