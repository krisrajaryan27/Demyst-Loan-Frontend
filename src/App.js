import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app mx-14">
      <Outlet />
    </div>
  );
}

export default App;
