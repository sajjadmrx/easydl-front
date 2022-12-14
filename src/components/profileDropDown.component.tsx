import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { CookieUtil } from "../utils/cookie.util";
import { AuthContext } from "../shared/interfaces/authContext.interface";
import { User } from "../shared/interfaces/user.interface";

export function ProfileDropDownComponent(): JSX.Element {
  const user: User = useContext(authContext).user as User;
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
          <div className="avatar online">
            <div className="w-10 rounded-full">
              <img src={user.avatar} alt={`${user.username} avatar`} />
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link className="justify-between" to="/profile">
              پروفایل
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
