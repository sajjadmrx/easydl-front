import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect, useState } from "react";
import { Badge } from "react-daisyui";
import { MainModalComponent } from "./main.modal";

export function UpdatesModalComponent(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isReadV, setIsReadV] = useState(false);
  let version = "1.2";

  useEffect(() => {
    const hasVs = localStorage.getItem(`isReadV_${version}`);
    if (hasVs) setIsRead(true);
    else {
      setIsOpen(true);
      setIsReadV(true);
    }
  }, []);

  useEffect(() => {
    if (isReadV) saveHanlder(version);
  }, [isReadV]);

  const update: any = {
    new: [
      "اضافه شدن دانلود آلبوم از پلتفرم اسپاتیفای ",
      "اضافه شدن دانلود پلی لیست از پلتفرم اسپاتیفای",
    ],
    1.1: [
      "🖼️ اضافه شدن توضیحات و کاور به موزیک های اسپاتیفای و ساندکلود",
      "🎙️ بهبود کیفیت موزیک های اسپاتیفای",
      "🧩 تغییرات ظاهری",
    ],
    "1.0": [
      "👤 اضافه شدن پنل کاربری",
      "🎺 اضافه شدن دانلود پادکست های رادیوجوان",
    ],
  };

  let newHtml = update.new
    .map((item: any, index: any) => {
      return (
        <div
          className="d-flex align-items-center mb-2"
          itemID={String(index + 1)}
        >
          <FontAwesomeIcon
            icon={["fas", "circle"]}
            className={"m-l-10 text-success text-[10px]"}
          />
          <span className={"ml-3 text-sm text-gray-400"}>{item}</span>
        </div>
      );
    })
    .sort((a: any, b: any) => {
      return b.props.itemID - a.props.itemID;
    });

  const keysOldVs: string[] = Object.keys(update)
    .filter((item) => {
      return item !== "new";
    })
    .sort((a: any, b: any) => {
      return a - b;
    });
  //
  const updateDetails = keysOldVs.map((item) => {
    const myUpdate = update[item];
    if (myUpdate) {
      const a = myUpdate.map((detail: any, index: any) => {
        return (
          <div
            className="d-flex align-items-center mb-2 "
            itemID={index + 1}
            key={index + 1}
          >
            <FontAwesomeIcon
              icon={["fas", "circle"]}
              className={"m-l-10 text-gray-900 text-[10px]"}
            />
            <span className={"ml-3 text-sm text-gray-400"}>{detail}</span>
          </div>
        );
      });

      let parent = (
        <div className=" m-t-10 py-3 mb-2 mt-2  divide-y divide-y-reverse divide-gray-500">
          <span className="text-white mt-3">نسخه {item}</span>
          {a.map((w: any) => w)}
        </div>
      );

      return parent;
    }
  });

  return (
    <MainModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
      <h5 className="modal-title text-white">
        <div className="avatar placeholder mr-3">
          <div className="bg-emerald-300 text-gray-900 rounded-full w-8">
            <FontAwesomeIcon icon={["fas", "s"]} />
          </div>
        </div>
        اطلاعیه بروزرسانی
      </h5>

      <div className={"modal-body overflow-y-auto h-[350px] w-[auto]"}>
        <h1 className="text-center mb-2 py-3"></h1>
        <span className="text-gray-200">تغییرات جدید</span>
        <div className="mt-[-19px] mb-2">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="flex flex-col-reverse divide-y divide-y-reverse divide-gray-500">
                    {newHtml.map((n: any) => n)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[-13px]">
          <span className="text-gray-400">نسخه های قدیمی</span>
          <div className="row mt-[-40px]">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="flex flex-col-reverse mt-3">
                    {updateDetails.map((u) => u)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div className="d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={["fas", "notebook"]} className={"mr-2"} />
          <span className="text-gray-200"> نسخه جدید: {version}</span>
        </div>
        <div className="text-center">
          <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon="times" className="mr-2" />
            بستن
          </button>
        </div>
      </div>
    </MainModalComponent>
  );
}

function saveHanlder(vs: any) {
  const isReadBofer = localStorage.getItem(`isReadV_${vs}`);
  if (!isReadBofer) {
    localStorage.setItem(`isReadV_${vs}`, "1");
  }
}
