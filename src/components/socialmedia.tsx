import { Facebook, Instagram, Linkedin } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

const socialLink = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61573900937008",
    icon: <Facebook className="size-5" />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/coolmasters.mz/",
    icon: <Instagram className="size-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/company/coolmasters-mz",
    icon: <Linkedin className="size-5" />,
  },
  // {
  //   title: "Linkedin",
  //   href: "https://www.tiktok.com/@coolmasters.mz",
  //   icon: <Tiktok className="size-5" />,
  // },
];

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <TooltipProvider>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                className={cn(
                  "hover:border-shop_light_green hoverEffect rounded-full border p-2 hover:text-white",
                  iconClassName,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "text-darkColor bg-white font-semibold",
                tooltipClassName,
              )}
            >
              {" "}
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default SocialMedia;
