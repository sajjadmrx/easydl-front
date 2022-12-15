import React, { useId, useState } from "react";

export function Tabs({ children }: any) {
  function findActiveTab(a: any) {
    return a.reduce((accumulator: any, currentValue: any, i: any) => {
      if (currentValue.props.active) {
        return i;
      }

      return accumulator;
    }, 0);
  }

  function tabValidator(tab: any) {
    return tab.type.displayName === "Tab";
  }

  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex gap-2  p-2 overflow-x-auto">
          {children.map((item: any, i: number) => {
            return (
              <>
                {tabValidator(item) && (
                  <Tab
                    key={`tab-${i}}`}
                    currentTab={i}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  >
                    {item.props.children}
                  </Tab>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="p-5">
        {children.map((item: any, i: any) => {
          return (
            <div className={` ${i === activeTab ? "visible" : "hidden"}`}>
              {item.props.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Tab({ children, activeTab, currentTab, setActiveTab }: any) {
  return (
    <>
      <div
        className={`px-5 py-3 rounded cursor-pointer w-[100px] h-[90px]
      ${
        activeTab === currentTab
          ? "bg-blue-500 text-white"
          : " bg-gray-700 text-white hover:border-blue-500 hover:border-2"
      } min-w flex flex-col items-center gap-2`}
        onClick={() => setActiveTab(currentTab)}
      >
        {children}
      </div>
    </>
  );
}

Tab.displayName = "Tab";
