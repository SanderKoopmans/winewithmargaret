import { Outlet } from "@remix-run/react";

export default function PrivacyPolicy() {
  return (
    <>
      <Outlet />
      <div>Policy placholder</div>
    </>
  );
}
