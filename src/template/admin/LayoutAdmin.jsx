import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";
import UserUse from "./UserUse";

export default function LayoutAdmin() {
  return (
    <div className="container row d-flex max-w-full">
      <HeaderAdmin />
      <UserUse />
      <Outlet />
    </div>
  );
}
