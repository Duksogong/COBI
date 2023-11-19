import { Routes, Route } from "react-router-dom"

import TestSearch from './components/views/TestPage/TestSearch'
import TestSearchReviews from "./components/views/TestPage/TestSearchReviews";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/test/search" Component={TestSearch} />
        <Route exact path="/test/searchReviews" Component={TestSearchReviews} />
      </Routes>
    </div>
  );
}

export default App;
