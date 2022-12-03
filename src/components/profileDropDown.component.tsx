import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { CookieUtil } from "../utils/cookie.util";
import { AuthContext } from "../shared/interfaces/authContext.interface";

export function ProfileDropDownComponent() {
  const user = useContext(authContext).user;
  const authContextData = useContext(authContext);
  const statusLoading = useContext(authContext).statusLoading;
  if (statusLoading) {
    return (
      <div>
        <button className="btn btn-ghost loading"></button>
      </div>
    );
  } else
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user.avatar} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link className="justify-between" to="/profile">
              پروفایل
              <span className="badge badge-success">جدید</span>
            </Link>
          </li>
          <li onClick={() => logoutHandler(authContextData)}>
            <a>خروج</a>
          </li>
        </ul>
      </div>
    );
}
function logoutHandler(authContext: AuthContext) {
  authContext.setIsAuthenticated(false);
  CookieUtil.delete("token");
}
