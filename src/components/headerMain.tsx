import Link from "next/link";
import CartIcon from "./cartIcon";
import Container from "./Container";
import HeaderMenu from "./headerMenu";
import Logo from "./logo";
import MobileMenu from "./mobileMenu";
import Searchbar from "./searchbar";
import { getServerSession } from "@/lib/get-session";

const Header = async () => {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="text-lightColor flex items-center justify-between">
        <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
          <Searchbar />
          <CartIcon />
          {user ? (
            <p>
              <Link href={`/dashboard`}>{user.name}</Link>
            </p>
          ) : (
            <Link href="/sign-in">Entrar</Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
