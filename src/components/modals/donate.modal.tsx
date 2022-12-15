import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge, Button, Modal } from "react-daisyui";

export function DonateModalComponent() {
  const donateText: string = "  حمایت مالی ";
  const [showModal, setShowModal] = React.useState(false);
  const donateUrl: string = "https://zarinp.al/easydl.net";
  return (
    <div>
      <Button
        className={"btn gap-2 normal-case btn-ghost"}
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={["fas", "donate"]} />
        <span className={"hidden md:inline"}>{donateText}</span>
      </Button>
      <Modal open={showModal} onClickBackdrop={() => setShowModal(false)}>
        <div className="">
          <div className={"py-2 p-2"}>
            <p className="font-normal">
              ⚠️ برای رایگان ماندن دائمی سرویس ها, به حمایت شما نیاز داریم!
            </p>
          </div>
          <div className="p-1">
            <ul className="my-4 space-y-3">
              <li>
                <div className="grid grid-rows-1 grid-flow-col gap-4 items-center">
                  <a href={donateUrl} target={"_blank"}>
                    <Button className="btn gap-1 normal-case btn-ghost border border-gray-700 container">
                      <Badge color={"ghost"}>💵</Badge>
                      حمایت از طریق زرین پال
                    </Button>
                  </a>
                </div>
              </li>
            </ul>
            <div className={""}>
              <a
                href="javascript:;"
                onClick={() => setShowModal(false)}
                className="inline-flex items-center text-xs font-normal hover:underline"
              >
                <FontAwesomeIcon icon={["fas", "times"]} className="mr-2" />
                <span>بعدا</span>
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
