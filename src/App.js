import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./store/authConext";

import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

import Dashboard from "./pages/dashboard/dashboard";
import Hotel from "./pages/hotel/hotel";
import AddNewHotel from "./pages/add-new-hotel/add-new-hotel";
import EditHotel from "./pages/edit-hotel/edit-hotel";
import Room from "./pages/room/room";
import AddNewRoom from "./pages/add-new-room/add-new-room";
import EditRoom from "./pages/edit-room/edit-room";
import Transaction from "./pages/transaction/transaction";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {ctx.isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}

        {ctx.isLoggedIn && <Route path="/hotel" element={<Hotel />} />}
        {ctx.isLoggedIn && (
          <Route path="/hotel/add-new" element={<AddNewHotel />} />
        )}
        {ctx.isLoggedIn && <Route path="/hotel/edit" element={<EditHotel />} />}
        {ctx.isLoggedIn && <Route path="/room" element={<Room />} />}
        {ctx.isLoggedIn && (
          <Route path="/room/add-new" element={<AddNewRoom />} />
        )}
        {ctx.isLoggedIn && <Route path="/room/edit" element={<EditRoom />} />}

        {ctx.isLoggedIn && (
          <Route path="/transaction" element={<Transaction />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
