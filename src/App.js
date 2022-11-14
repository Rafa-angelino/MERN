import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <Router>
      <MainNavigation />

      <main>
        <Routes>
          <Route path="/" element={<Users />} exact />
          <Route path="/places/new" element={<NewPlace />} exact />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
