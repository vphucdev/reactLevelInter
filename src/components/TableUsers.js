import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { fetUsers } from "../services/userServive";
import ReactPaginate from "react-paginate";

function TableUsers() {
  const [listUsers, setlistUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetUsers(currentPage);
      console.log(res);
      setTotalPages(res.total_pages);
      setlistUsers(res.data);
    };
    getUsers();
  }, [currentPage]);

  const handlePageClick = ({ selected }) => {
    console.log(typeof(selected))
    setCurrentPage(selected + 1);
  };
  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
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
    </>
  );
}

export default TableUsers;
