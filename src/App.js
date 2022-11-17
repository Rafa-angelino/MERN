import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Userplaces from "./places/pages/Userplaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";

const App = () => {
  return (
    <Router>
      <MainNavigation />

      <main>
        <Routes>
          <Route path="/" element={<Users />} exact />
          <Route path="/:userId/places" element={<Userplaces />} exact/>
          <Route path="/places/new" element={<NewPlace />} exact />
          <Route path="/places/:placeId" element={<UpdatePlace />} exact/>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
