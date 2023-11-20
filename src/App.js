import { Button, Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";


function App() {
  const ref = useRef();
  
  
  return (
    <div className="App">
      <Header />

      <Container>
        
        <TableUsers ref={ref} />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </div>
        // bọc Container ben ngoai để TableUsers không bị dính sát vào 2 bên lề
  );
}

export default App;
