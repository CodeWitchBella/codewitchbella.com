import { Outlet } from "@remix-run/react";
import { Nav } from "~/components/nav";

export default function NavRoute() {
  return (
    <Nav>
      <Outlet />
    </Nav>
  );
}
