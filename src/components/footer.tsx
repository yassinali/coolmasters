import React from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Container from "./Container";
import FooterTop from "./footerTop";
import Logo from "./logo";
import { SubText, SubTitle } from "./text";
import SocialMedia from "./socialmedia";
import { FooterCategorias } from "./footerCategorias";
import { quickLinksData } from "@/app/constants/data";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <Container>
        <FooterTop />
        <div className="grid grid-cols-1 gap-5 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Descubra colecções exclusivas de mobiliário, electrodomésticos e
              portáteis, que aliam estilo e conforto para transformar os seus
              espaços de vida.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Links</SubTitle>
            <ul className="mt-4 space-y-3">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categorias</SubTitle>
            <ul className="mt-4 space-y-3">
              <FooterCategorias />
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Inscreva-se para receber nossa newsletter com as últimas novidades
              e promoções.
            </SubText>
            <form className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="mt-4"
                type="email"
                required
              />
              <Button className="w-full">Subscrever</Button>
            </form>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. Todos os
            direitos reservedos.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
