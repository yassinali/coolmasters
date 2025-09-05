import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-shop_dark_green hover:text-shop_light_green text-2xl font-black tracking-wider uppercase",
          className,
        )}
      >
        Coolmasters
        <span
          className={cn(
            "text-shop_btn_dark_green group-hover:text-shop_dark_green hoverEffect",
            spanDesign,
          )}
        >
          mz
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
