import React from "react";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Login from "@/components/buttons/Login";

export default function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Salah Track</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Login />
      </NavbarContent>
    </Navbar>
  );
}
