import React from "react";
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
import { AiOutlineProject } from "react-icons/ai";

const Sidebar = () => {

  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow:"scroll initial"}}
    >
      <CDBSidebar
        textColor="#fff"
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large"></i>
          }
        >
          <a href="/" className="text-decoration-none" style={{color:"inherit"}}>
            TaskHub
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/dashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="columns"
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/task"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="circle"
              >
                Task
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/event"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="circle"
              >
                Event
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/project"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="circle"
              >
                Project
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/calendar"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="calendar"
              >
                Calendar
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/profile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="user"
              >
                profile
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
