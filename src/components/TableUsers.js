import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetUsers } from "../services/userServive";

function TableUsers() {
  const [listUsers, setlistUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetUsers();

      setlistUsers(res.data.data);
    };
    getUsers();
  }, []);
  console.log(listUsers);
  return (
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
  );
}

export default TableUsers;
