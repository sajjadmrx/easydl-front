import React from "react";
import { BsDiscord, BsTelegram } from "react-icons/bs";

export function FooterComponent(): JSX.Element {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <p>شبکه های اجتماعی</p>
        <div className="grid grid-flow-col gap-4">
          <a href={"https://discord.gg/EXfZkRHqwq"} target={"_blank"}>
            <BsDiscord size={30} />
          </a>
          <a href={"https://t.me/easydl_support"} target={"_blank"}>
            <BsTelegram size={30} />
          </a>
        </div>
      </div>
      <div>
        <p>
          کليه حقوق اين سایت متعلق به تیم <u>ایزی دانلود</u> می باشد.
        </p>
      </div>
    </footer>
  );
}
