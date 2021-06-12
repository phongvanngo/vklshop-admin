import React from "react";
import { useState } from "react";
import MovieTable from "./MovieManagement/Movie.table";
import TheaterSystemTable from "./TheaterManagement/TheaterSystem.table";

export default function TestLayout() {
  const [currentTab, setCurrentTab] = useState(0);

  const listTab = [
    {
      title: "Chi tiết sản phẩm",
      component: <TheaterSystemTable key="1" />,
    },
    { title: "Mẫu mã", component: <MovieTable key="2" /> },
    {
      title: "Tồn kho sản phẩm",
      component: <TheaterSystemTable key="3" />,
    },
  ];

  return (
    <div className="p-5">
      <div className="w-full rounded-2xl bg-white py-5 px-7 shadow-sm">
        <ul className="flex gap-5 border-b border-gray-200">
          {listTab.map((tab, index) => {
            return (
              <li
                onClick={() => {
                  setCurrentTab(index);
                }}
                key={index}
                style={
                  currentTab === index
                    ? {
                        marginBottom: "-1px",
                        borderBottom: "1px solid #42389d",
                        color: "#42389d",
                      }
                    : {}
                }
                className="p-2 cursor-pointer"
              >
                <span>{tab.title}</span>
              </li>
            );
          })}
        </ul>
        <div>
          <div className="py-5">{[listTab[currentTab].component]}</div>
        </div>
      </div>
    </div>
  );
}
