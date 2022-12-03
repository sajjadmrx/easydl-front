import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  to: string;
}

export function PageLinkComponent(props: Props) {
  return (
    <Link className="link link-hover" to={props.to}>
      {props.name}
    </Link>
  );
}
