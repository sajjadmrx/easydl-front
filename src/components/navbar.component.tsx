import React, { useContext, useEffect } from "react";
import { authContext } from "../contexts/authContext";
import { PageLinkComponent } from "./pageLinkComponent";
import { ProfileDropDownComponent } from "./profileDropDown.component";
import { ThemeSelectorComponent } from "./themeSelector.component";
import { authModalContext } from "../contexts/authModalContext";
import { pageLinks } from "../shared/constants/pages.constant";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { AiOutlineGithub } from "react-icons/ai";
import { RiVipCrown2Line } from "react-icons/ri";

export function NavbarComponent(): JSX.Element {
  const { isAuthenticated } = useContext(authContext);
  const { setShowModal } = useContext(authModalContext);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              {pageLinks.map((value: any, index: number) => {
                return (
                  <PageLinkComponent
                    name={value.name}
                    to={value.to}
                    key={index + 1}
                  />
                );
              })}
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <div>
          <Link to={"/subscription"}>
            <Button className={"btn gap-2 normal-case btn-ghost"}>
              <RiVipCrown2Line size={20} />
              <span className={"hidden md:inline"}>خرید اشتراک</span>
            </Button>
          </Link>
        </div>

        <ThemeSelectorComponent />
        {isAuthenticated ? (
          <ProfileDropDownComponent />
        ) : (
          <button
            className="btn btn-ghost gap-2"
            onClick={() => setShowModal(true)}
          >
            <IoLogInOutline size={20} />
            ورود
          </button>
        )}
      </div>
    </div>
  );
}
