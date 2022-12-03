import React from "react";
import { Link } from "react-router-dom";
import { PageLink } from "../shared/interfaces/pages.interface";

interface Props extends PageLink {}

export function PageLinkComponent(props: Props) {
  return (
    <Link className="link link-hover" to={props.to}>
      {props.name}
    </Link>
  );
}
