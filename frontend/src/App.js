import { Routes, Route } from "react-router-dom"

import TestSearch from './components/views/TestPage/TestSearch'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/test/search" Component={TestSearch} />
      </Routes>
    </div>
  );
}

export default App;
