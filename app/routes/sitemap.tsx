import { Outlet } from "@remix-run/react";

export default function Sitemap() {
  return (
    <>
      <Outlet />
      <div>Sitemap.xml placeholder</div>
    </>
  );
}
