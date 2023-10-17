import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Container> 
        <TableUsers />
      </Container>
    </div>
    // bọc Container ben ngoai để TableUsers không bị dính sát vào 2 bên lề
  );
}

export default App;
