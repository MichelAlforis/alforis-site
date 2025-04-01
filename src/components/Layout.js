import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer"; // si Footer est séparé, sinon on le laisse dans Home
import Navbar from "./Navbar"; // on l'extrait depuis Home.js

export default function Layout() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
