import { banner_1 } from "@/app/images";
import Image from "next/image";
import { Title } from "@/components/text";
import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="bg-shop_light_pink flex items-center justify-between rounded-lg px-10 py-16 md:py-0 lg:px-24">
      <div>
        <Title className="mb-5">
          Até 15% de desconto nos melhores <br /> electrodomésticos para a sua
          casa
        </Title>
        <Link
          href={"/shop"}
          className="bg-shop_dark_green/90 hover:bg-shop_dark_green hoverEffect rounded-md px-5 py-2 text-sm font-semibold text-white/90 hover:text-white"
        >
          Comprar agora
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          alt="banner"
          className="hidden w-96 md:inline-flex"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
