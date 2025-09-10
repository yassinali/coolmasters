import codingInFlowLogo from "@/assets/coding_in_flow_logo.jpg";
import { UserDropdown } from "@/components/user-dropdown";
import { getServerSession } from "@/lib/get-session";
import Image from "next/image";
import Link from "next/link";

export async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              src={codingInFlowLogo}
              alt="Coolmasters"
              width={32}
              height={32}
              className="border-muted rounded-full border"
            />
            Coolmastersmz
          </Link>
          <Link href={"/marcas"} className="cursor-pointer hover:underline">
            Marcas
          </Link>
          <Link href={"/categoria"} className="cursor-pointer hover:underline">
            Categorias
          </Link>
          <Link href={"/produtos"} className="cursor-pointer hover:underline">
            Produtos
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
