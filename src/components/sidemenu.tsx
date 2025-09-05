"use client";
import React, { FC } from "react";

import { X } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./socialmedia";
import { useOutsideClick } from "@/app/hook";
import Logo from "./logo";
import { headerData } from "@/app/constants/data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-screen w-full bg-black/50 text-white/70 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="border-r-shop_light_green flex h-screen max-w-96 min-w-72 flex-col gap-6 border-r bg-black p-10"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="hover:text-shop_light_green hoverEffect"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`hover:text-shop_light_green hoverEffect ${pathname === item?.href && "text-white"}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
