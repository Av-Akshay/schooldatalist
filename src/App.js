import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import './App.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoValue, deleteData, editData, addEditData } from "./actions";

function App() {
  const [btntoggle, setbtntoggle] = useState(true);
  const [school, setschool] = useState("SchoolA");
  const [name, setname] = useState("");
  const [add, setadd] = useState("");
  const [gen, setgen] = useState("");
  const [cls, setcls] = useState("");
  const personalInformation = useSelector((store) => store.addInfoData);
  console.log(personalInformation);
  const personData = {
    school:school,
    name: name,
    add: add,
    gen: gen,
    cls: cls
  };

  const schoolData =()=>{ 
    if(school==="SchoolA"){
   return  personalInformation.list;
  }else if(school==="SchoolB"){
    return personalInformation.schoolB;
  }else if(school=== "SchoolC"){
    return personalInformation.schoolC;
  }
}
const selectSchool = schoolData();
console.log(selectSchool);

  const dispatch = useDispatch();
  const nameinput = (event) => {
    setname(event.target.value);
  }
  const addinput = (event) => {
    setadd(event.target.value);
  }

  const inputValue = (event) => {
    setgen(event.target.value);
  };


  const inputclass = (event) => {
    if (event.target.value === "select the class") {
      alert("please select the valid class")
    } else {
      setcls(event.target.value);
    }
  }

  return (
    <div className="App" style={{display:"flex"}}>
      <div style={{display:"flex",flexDirection:"column",margin:"0rem 0.5rem",gap:"0.5rem"}}>
      <h1>Select the School</h1>
        <select onChange={(event)=>{setschool(event.target.value)}} value={school}>
          <option>SchoolA</option>
          <option>SchoolB</option>
          <option>SchoolC</option>
        </select>
      </div>
      <div style={{width:"100%"}}>
        <div style={{ margin: "0 auto", width: "90%" }}>
          <h1>Enter Your Details</h1>
        </div>
        <div style={{ display: "flex", height: "auto", width: "90%", justifyContent: "space-between", margin: "0 auto", alignItems: "center" }}>
          <input onChange={nameinput} type='text' name="name" value={name} placeholder='Enter Your Name' />
          <input onChange={addinput} type='text' name="adress" value={add} placeholder='Enter Your Addrees' />
          <select onChange={inputclass} value={cls} name="class" >
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
            <input type="radio" onChange={inputValue} checked={gen === "male"} id="html" name="category" value="male" />
            <label>Male</label>
            <input type="radio" onChange={inputValue} checked={gen === "female"} id="css" name="category" value="female" />
            <label>female</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>

            {(btntoggle) ? <button onClick={() => { dispatch(infoValue(personData)); setadd(""); setname(""); setcls("select the class"); setgen("") }}>Submit Data</button> : <button onClick={() => { setbtntoggle(true); dispatch(addEditData(personData)); }}><AiOutlineEdit /></button>}

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
            selectSchool?.map((curValue, index) => {
              console.log(curValue)
              return (<tr>
                <td>{index + 1}</td>
                <td>{curValue.name}</td>
                <td>{curValue.add}</td>
                <td>{curValue.gen}</td>
                <td>{curValue.cls}</td>
                <td><button onClick={() => { dispatch(editData(curValue)); setbtntoggle(false); setadd(curValue.add); setname(curValue.name); setcls(curValue.cls); setgen(curValue.gen) }}><AiOutlineEdit /></button>
                  <button onClick={() => { dispatch(deleteData(curValue)) }}><AiOutlineDelete /></button></td>
              </tr>)

            })
          }
        </table>
      </div>

    </div>
  );
}

export default App;
