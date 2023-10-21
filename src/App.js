import { Button, Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";

function App() {
  const [isShowModalAddNew, setisShowModalAddNew] = useState(false)
  return (
    <div className="App">
      <Header />

      <Container>
        <div className="my-3 d-flex justify-content-between align-items-center">
          <span>List Users: </span>
          <Button variant="success" onClick={()=>setisShowModalAddNew(true)}>Add New User</Button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={isShowModalAddNew} handleClose={()=>setisShowModalAddNew(false)} />
    </div>
    // bọc Container ben ngoai để TableUsers không bị dính sát vào 2 bên lề
  );
}

export default App;
