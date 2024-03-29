import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function Root({ handleThemeMode, themeMode }) {
  return (
    <>
      <Navbar handleThemeMode={handleThemeMode} themeMode={themeMode} />
      <Container
        sx={{
          minHeight: "62.7vh",
          display:'flex',
          flexFlow:'column',
          justifyContent: "center",
          alignItems: "center",
          "&> div": { borderRadius: "5px" },
        }}
      >
        <Outlet />
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
}
