import { useState } from 'react';
import './App.css';

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
    let oldUserData = [...userData,currentUserFormData]//old array + new array element
    setUserData(oldUserData);
    event.preventDefault();
  }

  return (
    <div className="App">
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
      </div>
    </div>
  );
}

export default App;
