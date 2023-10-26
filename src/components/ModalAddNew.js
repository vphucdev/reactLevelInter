import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser, postCreateUser, putUpdateUser } from "../services/userServive";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const ModalAddNew = ({
  show,
  handleClose,
  handlUpdateTable,
  action,
  userEdit,
  handlUpdateFromModal,
  handlUpdateWhenDelete,
}) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  
  const renderTitleModal = () => {
    switch (action) {
      case "add":
        return <Modal.Title>Add new user</Modal.Title>;
      case "edit":
        return <Modal.Title>Edit user</Modal.Title>;

      default:
        return <Modal.Title>Delete user</Modal.Title>;
    }
  };
  const handleSaveUser = async () => {
    try {
      setIsLoading(true);
      const res = await postCreateUser(name, job);
      setIsLoading(false);

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
      setIsLoading(true);
      const res = await putUpdateUser(name, job);
      setIsLoading(false);

      
      if (res && res.createdAt) {
        toast.success("update successed");
        handlUpdateFromModal({ id: userEdit.id, first_name: name });
        setName("");
        setJob("");
      }
      handleClose();
    } catch (error) {
      toast.error("Add user failed");

      console.log(error);
    }
  };

  const handlConfirmDelete = async () => {
    setIsLoading(true)
    let res = await deleteUser(userEdit.id)
    console.log(res)
    setIsLoading(false)
    if (res && res.status === 204) {
      
  
      console.log(res)
      handlUpdateWhenDelete(userEdit);
      toast.success("Delete success")
    } else toast.error("Delete error")
    handleClose();
  };
  return (
    <div>
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>{renderTitleModal()}</Modal.Header>

        <Modal.Body>
          {action === "del" ? (
            <div>
              <p>Delete this user: </p>
              <img src={userEdit.avatar} alt="" className="avatar" />
              <span className="ms-3">{userEdit.first_name}</span>{" "}
            </div>
          ) : action === "add" ? (
            <div className="body-add-new">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>

                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="body-add-new">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>

                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  defaultValue={userEdit.first_name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {action === "add" ? (
            <Button variant="primary" onClick={handleSaveUser}>
              <span className="d-flex gap-2">
                Save Changes
                {isLoading && (
                  <ReactLoading
                    type="spin"
                    color="#fff"
                    height={20}
                    width={20}
                  />
                )}
              </span>
            </Button>
          ) : action === "edit" ? (
            <Button variant="primary" onClick={handlEdit}>
              <span className="d-flex gap-2">
                Confirm
                {isLoading && (
                  <ReactLoading
                    type="spin"
                    color="#fff"
                    height={20}
                    width={20}
                  />
                )}
              </span>
            </Button>
          ) : (
            <Button variant="primary" onClick={handlConfirmDelete}>
              <span className="d-flex gap-2">
                Delete user
                {isLoading && (
                  <ReactLoading
                    type="spin"
                    color="#fff"
                    height={20}
                    width={20}
                  />
                )}
              </span>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
