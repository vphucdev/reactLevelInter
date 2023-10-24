import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateUser, putUpdateUser } from "../services/userServive";
import { toast } from "react-toastify";

const ModalAddNew = ({
  show,
  handleClose,
  handlUpdateTable,
  action,
  userEdit,
  handlUpdateFromModal,
}) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const inputRef = useRef();

  const handleSaveUser = async () => {
    try {
      const res = await postCreateUser(name, job);
      handleClose();

      toast.success("Add user successed");
      handlUpdateTable({ id: res.id, first_name: name });
      setName("");
      setJob("");
    } catch (error) {
      toast.error("Add user failed");

      console.log(error);
    }
  };
  const handlEdit = async () => {
    try {
      handleClose();
      const res = await putUpdateUser(name, job);

      if (res && res.createdAt) {
        toast.success("update successed");
        handlUpdateFromModal({ id: userEdit.id, first_name: name });
        setName("");
        setJob("");
      }
    } catch (error) {
      toast.error("Add user failed");

      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {action === "add" ? (
            <Modal.Title>Add new user</Modal.Title>
          ) : (
            <Modal.Title>Edit user</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              {action === "add" ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  defaultValue={userEdit.first_name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
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
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {action === "add" ? (
            <Button variant="primary" onClick={handleSaveUser}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handlEdit}>
              Confirm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
