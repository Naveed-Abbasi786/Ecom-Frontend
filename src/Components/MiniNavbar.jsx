import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function MiniNavbar() {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className="w-full flex lg:justify-between justify-around items-center h-8 border-b">
      <div className="w-auto gap-4 lg:flex hidden ml-20">
        <div className="flex items-center gap-2 px-2 group hover:text-[#1cc0a0]">
          <Icon
            icon="fluent:call-24-regular"
            className="text-gray-400 text-[16px] cursor-pointer group-hover:text-[#1cc0a0]"
          />
          <span className="text-gray-400 font-Poppins text-[14px] cursor-pointer group-hover:text-[#1cc0a0]">
            Call: +98 765 432
          </span>
        </div>
        <span className="uppercase text-gray-400 font-Poppins text-[14px] hover:text-[#1cc0a0] cursor-pointer hover:underline">
          About Us
        </span>
        <span className="uppercase text-gray-400 font-Poppins text-[14px] hover:text-[#1cc0a0] cursor-pointer hover:underline">
          Contact Us
        </span>
      </div>

      <div>
        <Menu>
          <MenuButton 
            onClick={toggleCategories} 
            className="inline-flex lg:hidden flex items-center text-[14px] hover:text-[#1cc0a0] cursor-pointer uppercase font-Poppins text-gray-400 bg-transparent"
          >
            links
            <ChevronDownIcon 
              className={`ml-2 ${isCategoriesOpen ? "transform rotate-180" : ""} text-gray-500`} 
              width={20} 
              height={20} 
            />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-18 origin-top-right bg-white shadow-lg rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <div className="group rounded-lg flex items-center gap-2 py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                <Icon
                  icon="fluent:call-24-regular"
                  className="text-gray-400 text-[16px] hover:text-[#1cc0a0] cursor-pointer"
                />
                <span className="text-gray-400 font-Poppins text-[14px] hover:text-[#1cc0a0] cursor-pointer">
                  Call: +98 765 432
                </span>
              </div>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                <span className="uppercase text-gray-400 font-Poppins text-[14px] hover:text-[#1cc0a0] cursor-pointer hover:underline">
                  About Us
                </span>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                <span className="uppercase text-gray-400 font-Poppins text-[14px] hover:text-[#1cc0a0] cursor-pointer hover:underline">
                  Contact Us
                </span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <div className="flex lg:justify-around gap-2 lg:mr-20 mr-0">
        <div className="flex items-center gap-2 group">
          <Icon
            icon="mdi:account-outline"
            className="text-gray-400 text-[18px] -mt-1 cursor-pointer group-hover:text-[#1cc0a0]"
          />
          <span className="uppercase text-gray-400 font-Poppins text-[14px] cursor-pointer group-hover:text-[#1cc0a0]">
            Account
          </span>
        </div>
        <Menu>
          <MenuButton 
            onClick={toggleCategories} 
            className="inline-flex items-center text-[14px] cursor-pointer uppercase font-Poppins text-gray-400 bg-transparent hover:text-[#1cc0a0] group"
          >
            Usd
            <ChevronDownIcon 
              className={`${isCategoriesOpen ? "transform rotate-180" : ""} text-gray-400`} 
              width={20} 
              height={20} 
            />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-18 origin-top-right bg-white  shadow-lg rounded-xl border border-white/5  p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer items-center gap-2 text-black rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                Pkr
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                Aur
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200 font-Poppins">
                Pkr
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group font-Poppins flex w-full text-gray-400 text-[14px] hover:text-[#1cc0a0] cursor-pointer items-center gap-2 text-black rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                IND
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
