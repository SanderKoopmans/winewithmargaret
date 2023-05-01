import { Outlet } from "@remix-run/react";

export default function Contact() {
  return (
    <>
      <Outlet />
      <div>Contact page</div>
    </>
  );
}
