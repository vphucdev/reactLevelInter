import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Table from "react-bootstrap/Table";

import { fetUsers } from "../services/userServive";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";

function TableUsers(props, ref) {
  const [isShowModalAddNew, setisShowModalAddNew] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [userEdit, setUserEdit] = useState({});

  const [listUsers, setlistUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useImperativeHandle(ref, () => ({ handlClickAddUser }));

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetUsers(currentPage);
      
      setTotalPages(res.total_pages);
      setlistUsers(res.data);
    };
    getUsers();
  }, [currentPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handlUpdateTable = (user) => {
    setlistUsers([user, ...listUsers]);
  };
  const handlClickAddUser = () => {
    
    setisShowModalAddNew(true);
    setModalAction("add");
  };
  const handlClickEditUser = (item) => {
    setisShowModalAddNew(true);
    setModalAction("edit");
    setUserEdit(item);
  };

  const handlClickDeleteUser = (item) => {
    setisShowModalAddNew(true);
    setModalAction("del");
    setUserEdit(item);
  };

  const handlUpdateFromModal = (item) => {
    let newListUsers = [...listUsers]
    let user = newListUsers.find(user => {
      return user.id === item.id
    })
    user.first_name = item.first_name
    setlistUsers(newListUsers)
  };
  const handlUpdateWhenDelete = (user,index) => {
    let newListUsers = listUsers.filter(item => item.id !== user.id)
    setlistUsers(newListUsers)
    

  }
  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {
                    <img
                      src={item.avatar}
                      alt=""
                      className="avatar mx-auto d-block"
                    />
                  }
                </td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning mx-3"
                      onClick={() => handlClickEditUser(item)}
                    >
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handlClickDeleteUser(item)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setisShowModalAddNew(false)}
        handlUpdateTable={handlUpdateTable}
        action={modalAction}
        userEdit={userEdit}
        handlUpdateFromModal={handlUpdateFromModal}
        handlUpdateWhenDelete={handlUpdateWhenDelete}
      />
    </>
  );
}

export default forwardRef(TableUsers);
