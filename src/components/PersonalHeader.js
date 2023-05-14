import { Outlet } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar className="p-3 bg-dark">
        <Navbar.Brand className="text-white">Облік витрат</Navbar.Brand>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
