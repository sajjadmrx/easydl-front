import { useContext, useEffect } from "react";
import AuthContext from "../contexts/auth.context";

export function ProfileDropDownComponent() {
    const user = useContext(AuthContext).user;
    const statusLoading = useContext(AuthContext).statusLoading;
    if (statusLoading) {
        return <div>
            <button className="btn btn-ghost loading"></button>
        </div>
    } else
        return (
            <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user.avatar} />
                    </div>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            پروفایل
                            <span className="badge badge-success">جدید</span>
                        </a>
                    </li>
                    <li><a>خروج</a></li>
                </ul>
            </div>
        )
}