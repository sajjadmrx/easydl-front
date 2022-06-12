import { ToastContainer } from "react-toastify";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar.component";

export function PageWrapper(props) {
    return (
        <div>
            <NavbarComponent />
            {props.children}
            <FooterComponent />
            <ToastContainer theme='dark' />
        </div>
    )
}