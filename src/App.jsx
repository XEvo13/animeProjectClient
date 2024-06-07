import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AnimeList from "./components/AnimeListing";
import AnimeDetail from "./components/AnimeDetail";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import { AuthProviderWrapper } from "./context/auth.context";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProviderWrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<IsPrivate>{" "}<AnimeList />{" "}</IsPrivate>} />
        <Route path="/:userId" element={<IsPrivate>{" "}<UserPage />{" "}</IsPrivate>} />
        <Route path="/anime/:id" element={<IsPrivate>{" "}<AnimeDetail />{" "}</IsPrivate>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
      </Routes>
      <Footer />
    </AuthProviderWrapper>
  );
}

export default App;
