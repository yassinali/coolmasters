import { MapPin, Phone, Clock, Mail } from "lucide-react";
import React from "react";
interface ContactItemData {
  title: string;
  subtitle: string;
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
    subtitle: "+25882 0624609",
    icon: (
      <Phone className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Aberto",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Email",
    subtitle: "geral@coolmastersmz.com",
    icon: (
      <Mail className="group-hover:text-primary h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 gap-8 border-b lg:grid lg:grid-cols-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="group hoverEffect flex items-center gap-3 p-4 transition-colors hover:bg-gray-50"
        >
          {item?.icon}
          <div>
            <h3 className="hoverEffect font-semibold text-gray-900 group-hover:text-black">
              {item.title}
            </h3>
            <p className="hoverEffect text-sm text-gray-600 group-hover:text-gray-900">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
