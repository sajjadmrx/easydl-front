import { useContext } from "react";
import AuthContext from "../contexts/auth.context";
import { infoStore } from "../store/info.store";

export function FooterComponent() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content text-lg mt-2">
      <div>
        <p>
          کليه حقوق اين سایت متعلق به ایزی دانلود می باشد و هر گونه کپی برداری
          از سایت غیر مجاز و بدون رضایت ماست.
        </p>
      </div>
    </footer>
  );
}
