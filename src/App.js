import { useState } from 'react';
import './App.css';
import {Table} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify';

function App() {
let [formData,setFormData] = useState(
  {
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''
  });

  let [userData,setUserData] = useState([]);

  let getValue = (event) => {
    let oldData = {...formData}
    let inputName = event.target.name;
    let inputValue= event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  let handleSubmit = (event) => {
    let currentUserFormData = {
      uname: formData.uname,
      uemail:formData.uemail,
      uphone:formData.uphone,
      umessage:formData.umessage
    };

    if(formData.index === '') {
      let checkFilterUser = userData.filter((item) => item.uemail == formData.uemail || item.uphone  == formData.uphone);
      if(checkFilterUser.length ==1) {
        toast.error('Email or Phone already exists!')
      } else {
        let oldUserData = [...userData,currentUserFormData]//old array + new array element
        setUserData(oldUserData);
        setFormData( {
          uname:'',
          uemail:'',
          uphone:'',
          umessage:'',
          index:''
        });
        toast.success("Saved!")
      }
    } else {
      let editIndex = formData.index;
      let oldData = userData;
      let checkFilterUser = userData.filter((item,i) => (item.uemail == formData.uemail || item.uphone  == formData.uphone) && i!=editIndex);
      if(checkFilterUser.length == 0) {
        oldData[editIndex]['uname'] = formData.uname;
        oldData[editIndex]['uphone'] = formData.uphone;
        oldData[editIndex]['uemail'] = formData.uemail;
        oldData[editIndex]['umessage'] = formData.umessage;
        setUserData(oldData);
        setFormData( {
          uname:'',
          uemail:'',
          uphone:'',
          umessage:'',
          index:''
        });
        toast.success("Updated!")
      } else {
        toast.error("Already exists")
      }
      
    }

    
    event.preventDefault();
  }

  let deleteRow = (indexNumber) => {
    let filterDataAfterDelete  = userData.filter((item,i) => i!= indexNumber)
    setUserData(filterDataAfterDelete)
    toast.success("Deleted");
  }

  let editRow = (indexNumber) => {
    let editData = userData.filter((item,i) => i== indexNumber)[0];
    editData['index'] = indexNumber
    setFormData(editData);
  } 

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <div className='container'>
        <div className='row'>
          <h1>Enquiry Form</h1>
          {userData.length}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name='uname' value={formData.uname} onChange={getValue}></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" name='uemail' value={formData.uemail} onChange={getValue}></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name='uphone' value={formData.uphone} onChange={getValue}></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" name='umessage' rows="3" value={formData.umessage} onChange={getValue}/>
            </div>
            <button className="btn btn-primary">{formData.index !== '' ? 'Update' : 'Save'}</button>
          </form>
        </div>
        <div style={{marginTop:'1rem'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { userData.length>=1 ? 
                userData.map((item,i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{item.uname}</td>
                      <td>{item.uemail}</td>
                      <td>{item.uphone}</td>
                      <td>{item.umessage}</td>
                      <td>
                        <button onClick={() => editRow(i)}>Update</button>
                        <button onClick={() => deleteRow(i)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
                 :
                <tr>
                  <td colSpan={6}>No Data</td>
                </tr>
              }
              
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
