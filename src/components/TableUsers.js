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
  faFileArrowDown,
  faFileImport,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./TableUsers.scss";
import _, { debounce } from "lodash";
import { ClearIcon } from "./Icons";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Papa from "papaparse";

function TableUsers(props, ref) {
  const [isShowModalAddNew, setisShowModalAddNew] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [userEdit, setUserEdit] = useState({});

  const [listUsers, setlistUsers] = useState([]);
  const [listUsersRoot, setlistUsersRoot] = useState([]);// phải dùng thêm listUsersRoot vì khi dùng chức năng filter
                                                        // sau khi filter xóa từng kí tự của searchValue thì sẽ bị lỗi
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  // useImperativeHandle(ref, () => ({ handlClickAddUser, listUsers }));

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

  const debouncedValue = Debounce(searchValue, 300);

  useEffect(() => {
    //let newListUsers = _.cloneDeep(listUsers) // dùng listUsers sẽ bị lỗi khi xóa từng kí tự của searchValue, phải dùng listUsersRoot
    let newListUsers = _.cloneDeep(listUsersRoot);
    newListUsers = newListUsers.filter((item) =>
      item.email.includes(searchValue)
    );
    setlistUsers(newListUsers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // const handleFilter = debounce((searchValue) => {
  //   // dùng hàm này thì phải xóa dòng này ở thẻ input: "value={searchValue}"
  //   let newListUsers = _.cloneDeep(listUsersRoot);
  //   newListUsers = newListUsers.filter((item) =>
  //     item.email.includes(searchValue)
  //   );
  //   setlistUsers(newListUsers);
  // }, 300);

  const handleClickClearBtn = () => {
    setSearchValue("");
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
  ];

  const csvData = listUsers;

  const handlImportCSV = (e) => {
    const file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Only accept csv files");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: function (results) {
        console.log(results.data.length);
        results.data.pop();
        if (results.data.length === 0) {
          console.log("error");
          toast.error("Not found data on CSV file");
          return;
        }
        const result = results.data.map((result) => {
          return {
            first_name: result["First Name"],
            last_name: result["Last Name"],
            email: result["Email"],
          };
        });
        console.log(result);
        setlistUsers(result);
      },
    });
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <span>List Users: </span>
        <div className="d-flex gap-2">
          <label htmlFor="import-csv" className="btn btn-danger">
            <FontAwesomeIcon className="me-2" icon={faFileImport} />
            Import CSV
          </label>
          <input id="import-csv" type="file" hidden onChange={handlImportCSV} />
          <CSVLink
            separator={"  "}
            enclosingCharacter={``}
            data={csvData}
            headers={headers}
            filename={"user.csv"}
            className="btn btn-primary"
          >
            <FontAwesomeIcon className="me-2" icon={faFileArrowDown} />
            Export CSV
          </CSVLink>

          <Button variant="success" onClick={handlClickAddUser}>
            <FontAwesomeIcon className="me-2" icon={faPlusCircle} />
            Add New User
          </Button>
        </div>
      </div>
      <div className="search col-4 my-3">
        <input
          className="form-control"
          placeholder="Enter email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button className="clear-btn" onClick={handleClickClearBtn}>
          <ClearIcon className="clear-icon" width="1.4rem" height="1.4rem" />
        </button>
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
            listUsers.map((item, index) => (
              <tr key={index}>
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
