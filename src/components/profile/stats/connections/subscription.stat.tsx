import { TbVip, TbVipOff } from "react-icons/tb";
import React from "react";
import moment from "moment-jalaali";
interface Prop {
  sub: string;
}
export function SubscriptionStat(props: Prop) {
  moment.loadPersian({ usePersianDigits: true });
  const time = moment(props.sub);
  let expiredFa = time.locale("fa").fromNow().replace("در", "");
  const isSub = moment(props.sub).isAfter(moment());
  const subtext: string = isSub
    ? `  ${time.format("YYYY-MM-DD")} | ${expiredFa} دیگر `
    : `اشتراک ندارید`;
  return (
    <div className="stat">
      <div className="stat-figure ">
        {isSub ? (
          <TbVip size={35} className="text-green-400" />
        ) : (
          <TbVipOff size={35} />
        )}
      </div>
      <div className="stat-title">وضعیت اشتراک</div>
      <div className="stat-value ">
        <p className={"text-xs"}>{subtext}</p>
      </div>
    </div>
  );
}
