import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalAddNew = ({ show, handleClose }) => {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  const handleSaveUser = () => {
    console.log(name, job)
    handleClose()
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={job}
                onChange={(e)=>setJob(e.target.value)}
              />
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
