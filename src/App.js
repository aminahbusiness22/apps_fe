
import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {
  
  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [position,setPosition]=useState("");
  const [country,setCountry]=useState("");
  const [wage,setWage]=useState(0);
  const [newwage,setNewWage]=useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addemployee = () =>(
   axios.post('http://13.231.251.241:3000/create',{
     name: name,
     age: age,
     position: position,
     country: country,
     wage:wage,
   }).then(()=> {
     setEmployeeList([
       ...employeeList,
       {
        name: name,
        age: age,
        position: position,
        country: country,
        wage:wage,
       }
     ])
   })
  );


  const showemployees = () =>(
    axios.get('http://13.231.251.241:3000/employees',{}).then((respons)=> {
     setEmployeeList(respons.data);
   })
  );

  const updateEmployeewage =(id) =>{
    axios.put('http://13.231.251.241:3000/update',{wage:newwage, id:id}).then((respons)=>
    {
     setEmployeeList(employeeList.map((val)=>{
       return val.id == id ?{id:val.id, name: val.name, country: val.country, position: val.position, age: val.age, wage: newwage}: val
     }
     ))
  })
  }

  return (
    <div className="App">
      <div className="information">
           <h1>Employees Details</h1>

           <label>Name :</label>
           <input type="text" 
           onChange={(event)=>{
             setName(event.target.value);
           }
           } />

           <label>Age :</label>
           <input type="number"
            onChange={(event)=>{
              setAge(event.target.value);
            }
            } 
           />

           <label>Position :</label>
           <input type="text"
             onChange={(event)=>{
              setPosition(event.target.value);
            }
            } 
           />

           <label>Country :</label>
           <input type="text"
              onChange={(event)=>{
                setCountry(event.target.value);
              }
              } 
           />

           <label>Wage(year) :</label>
           <input type="number"
              onChange={(event)=>{
                setWage(event.target.value);
              }
              } 
           />

           <button onClick={addemployee}>Add</button>
          
      </div>

      ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         <div className="employees">
            <button onClick={showemployees}>Show Employees</button>

           {employeeList.map((val,key) =>{
             return(
               <div className="employee">
                 <div>
                 <h3>Name :{val.name}</h3>
                 <h3>Age :{val.age}</h3>
                 <h3>Position :{val.position}</h3>
                 <h3>Country :{val.country}</h3>
                 <h3>Wage :{val.wage}</h3>
                 </div>
                  <div>
                  <input type="text" placeholder="2000..." 
                  onChange={(event)=>{
                    setNewWage(event.target.value);
                  }
                 }
                  />
                  <button onClick={()=>{updateEmployeewage(val.id)}}>Update</button>
                  </div>
               </div>
             )
           })}
            
         </div>
         
      {/* <div className="Login">
          <h1>Login</h1>

          <label>Email</label>
          <input type="text"/>

          <label>Password</label>
          <input type="text"/>
          <button>Login</button>
      </div> */}
    </div>
  );
}

export default App;
