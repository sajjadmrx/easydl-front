import { HistoryItem } from "./item-history.component";
export function HistoryTable(props) {
  const downloads = props.downloads;
  return (
    <table className="table-auto text-gray-400 border-separate space-y-6 text-sm min-w-full">
      <thead className="bg-gray-800 text-gray-500">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3 text-left">نام فایل</th>
          <th className="p-3 text-left">پلتفرم</th>
          <th className="p-3 text-left">لینک دریافتی</th>
          <th className="p-3 text-left">موفقیت آمیز؟</th>
          <th className="p-3 text-left">تاریخ</th>
        </tr>
      </thead>
      <tbody>
        {downloads.map((item, index) => {
          return <HistoryItem key={index + 1} index={index} item={item} />;
        })}
      </tbody>
    </table>
  );
}
