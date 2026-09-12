import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Alphabet from "./pages/Alphabet";
import Words from "./pages/Words";
import WordLevel from "./pages/WordLevel";

import Game from "./pages/Game";
import CameraGame from "./pages/CameraGame";
import NoCameraGame from "./pages/NoCameraGame";

import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/learning" element={<Learning />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/words" element={<Words />} />
        <Route path="/words/level/:levelId" element={<WordLevel />} />

        <Route path="/game" element={<Game />} />
        <Route path="/game/camera" element={<CameraGame />} />
        <Route path="/game/no-camera" element={<NoCameraGame />} />

        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </HashRouter>
  );
}

export default App;