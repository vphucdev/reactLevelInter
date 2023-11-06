import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Table from "react-bootstrap/Table";

import Debounce from "./useDebounce";
import { fetUsers } from "../services/userServive";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";
import "./TableUsers.scss";
import _, { debounce } from "lodash";
function TableUsers(props, ref) {
  const [isShowModalAddNew, setisShowModalAddNew] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [userEdit, setUserEdit] = useState({});

  const [listUsers, setlistUsers] = useState([]);
  const [listUsersRoot, setlistUsersRoot] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useImperativeHandle(ref, () => ({ handlClickAddUser }));

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetUsers(currentPage);
      setTotalPages(res.total_pages);
      setlistUsers(res.data);
      setlistUsersRoot(res.data);
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
    let newListUsers = [...listUsers];
    let user = newListUsers.find((user) => {
      return user.id === item.id;
    });
    user.first_name = item.first_name;
    setlistUsers(newListUsers);
  };
  const handlUpdateWhenDelete = (user, index) => {
    let newListUsers = listUsers.filter((item) => item.id !== user.id);
    setlistUsers(newListUsers);
  };

  const handleSort = (sortBy, sortField) => {
    let listUsersSorted = _.cloneDeep(listUsers);
    listUsersSorted = _.orderBy(listUsersSorted, [sortField], [sortBy]);
    setlistUsers(listUsersSorted);
  };

  // const debouncedValue = Debounce(searchValue, 300);

  // useEffect(() => {
  //   let newListUsers = _.cloneDeep(listUsersRoot);
  //   newListUsers = newListUsers.filter((item) =>
  //     item.email.includes(searchValue)
  //   );
  //   setlistUsers(newListUsers);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedValue]);

  const handleFilter = debounce((searchValue) => {
    // setSearchValue(searchValue)
      let newListUsers = _.cloneDeep(listUsersRoot);
      newListUsers = newListUsers.filter((item) =>
        item.email.includes(searchValue)
      );
      setlistUsers(newListUsers);
  }, 300)
  return (
    <>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Enter email"
          // value={searchValue}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <Table striped bordered hover variant="light" className="text-center">
        <thead>
          <tr>
            <th className="d-flex justify-content-between btn-sort">
              <span>ID</span>
              <span>
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleSort("desc", "id")}
                >
                  <FontAwesomeIcon icon={faArrowDownLong} />
                </button>
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleSort("asc", "id")}
                >
                  <FontAwesomeIcon icon={faArrowUpLong} />
                </button>
              </span>
            </th>
            <th>Avatar</th>
            <th>Email</th>
            <th className="d-flex justify-content-between btn-sort">
              <span>First Name</span>
              <span>
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleSort("desc", "first_name")}
                >
                  <FontAwesomeIcon icon={faArrowDownLong} />
                </button>
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleSort("asc", "first_name")}
                >
                  <FontAwesomeIcon icon={faArrowUpLong} />
                </button>
              </span>
            </th>
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
                <td>{item.email}</td>
                <td>{item.first_name}</td>
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
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handlClickDeleteUser(item)}
                    >
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
