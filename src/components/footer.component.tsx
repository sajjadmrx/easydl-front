import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge } from "react-daisyui";

export function FooterComponent(): JSX.Element {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <p>شبکه های اجتماعی</p>
        <div className="grid grid-flow-col gap-4">
          <a href={"https://discord.gg/EXfZkRHqwq"} target={"_blank"}>
            <FontAwesomeIcon icon={["fab", "discord"]} size={"2x"} />
          </a>
          <a href={"https://t.me/easydl_support"} target={"_blank"}>
            <FontAwesomeIcon icon={["fab", "telegram"]} size={"2x"} />
          </a>
        </div>
      </div>
      <div>
        <p>
          کليه حقوق اين سایت متعلق به ایزی دانلود می باشد و هر گونه کپی برداری
          از سایت غیر مجاز و بدون رضایت ماست.
        </p>
      </div>
    </footer>
  );
}
