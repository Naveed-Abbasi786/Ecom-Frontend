import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function PageHeader({ title, subtitle, breadcrumbs }) {
  return (
    <div>
      {/* Header Section */}
      <div className="w-full h-[30vh] bg-[#F6F6F6] flex justify-center items-center">
        <div>
          <h1 className="font-Poppins text-[#333333] text-[40px] leading-[44px] tracking-[1]">
            {title}
          </h1>
          <h4 className="font-Poppins text-[#5EC1A1] text-center text-[20px] -tracking-[1]">
            {subtitle}
          </h4>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="flex items-center gap-1 mt-4 ml-[5%]">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className="text-[14px] font-Poppins cursor-pointer text-[#6b6b6b] hover:text-[#222] hover:underline">
              <Link to={crumb.link}>{crumb.label}</Link>
            </span>
            {index < breadcrumbs.length - 1 && (
              <Icon
                icon="iconamoon:arrow-right-2-thin"
                className="text-[20px] font-Poppins text-[#222] cursor-pointer"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
