import { Link } from "react-router-dom";

export function PagesLinkComponent() {
    return [
        <Link className="link link-hover" to="/"> خانه </Link>,
        <Link className="link link-hover" to="/about">درباره ما</Link>,
        <Link className="link link-hover" to="/help">راهنما</Link>,
        <Link className="link link-hover" to="/report">گزارش خطا</Link>,
    ]

}