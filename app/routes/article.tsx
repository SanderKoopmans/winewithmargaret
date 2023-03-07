import { Outlet } from "@remix-run/react";

export default function Article() {
    return (
        <>
        {/* <div> */}
            {/* <h1>Another page in here</h1> */}
            <Outlet />
        {/* </div> */}
        </>
    )
}