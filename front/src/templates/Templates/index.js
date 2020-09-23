import React from "react";
import { withCookies } from "react-cookie";
import "./style.scss";
import StatusModal from "./statusModal";
import Header from "./header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";

const Templates = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <StatusModal />
      <Footer />
      <ToastContainer autoClose={false} closeButton={false} draggable={false}/>
    </>
  );
};

export default withCookies(Templates);