import React from "react";
import { Header } from "../css/Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";

const Navbar = () => {

	return (
        <Header style={{background:"rgb(17, 24, 39)", color:"#fff", width: "100%"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-between">
            <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav"/>
            <div className="flex">
              <i className="fas fa-bell"></i>
              <i className="fas fa-comment-alt mx-4"></i>
              <img alt="panelImage" src="public/img/pane4.png" style={{width:"3rem",height:"3rem"}}/>
            </div>
          </CDBNavbar>
        </Header>
	);
}

export default Navbar;
