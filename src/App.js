import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChapterPage from "./pages/ChapterPage";
import VersePage from "./pages/VersePage";
import SearchResults from "./pages/SearchResults"; 


import Header from "./components/Header";

function App() {
  return (
    <Router basename="gitasupersite">
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="chapter/:chapterId" element={<ChapterPage />} />
        <Route path="chapter/:chapterId/verse/:verseId" element={<VersePage />} />
        <Route path="search/:query" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;



