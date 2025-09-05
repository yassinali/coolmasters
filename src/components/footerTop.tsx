import { MapPin, Phone, Clock, Mail } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: React.ReactNode; // agora pode ser string ou JSX
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visite-nos",
    subtitle: "Maputo, Rua da Franca",
    icon: (
      <MapPin className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Ligue-nos",
    subtitle: (
      <a
        href="tel:+258820624609"
        className="hover:underline-none cursor-pointer"
      >
        +25882 0624609
      </a>
    ),
    icon: (
      <Phone className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Aberto",
    subtitle: (
      <span className="whitespace-pre-line">
        Seg - Sext: 08:00 - 18:00{"\n"}Sab: 08:00 - 14:00
      </span>
    ),
    icon: (
      <Clock className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Email",
    subtitle: (
      <a
        href="mailto:geral@coolmastersmz.com"
        className="hover:underline-none cursor-pointer"
      >
        geral@coolmastersmz.com
      </a>
    ),
    icon: (
      <Mail className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 gap-8 border-b lg:grid-cols-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="group hoverEffect flex items-center gap-3 p-4 transition-colors hover:bg-gray-50"
        >
          {item.icon}
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-black">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-900">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
