import CartIcon from "./cartIcon";
import Container from "./Container";
import HeaderMenu from "./headerMenu";
import Logo from "./logo";
import MobileMenu from "./mobileMenu";
import Searchbar from "./searchbar";

const Header = async () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 py-5 backdrop-blur-md">
      <Container className="text-lightColor flex items-center justify-between">
        <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
          <Searchbar />
          <CartIcon />
          Entrar
        </div>
      </Container>
    </header>
  );
};

export default Header;
