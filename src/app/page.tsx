import betterAuthLogo from "@/assets/better_auth_logo.png";
import codingInFlowLogo from "@/assets/coding_in_flow_logo.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image
            src={codingInFlowLogo}
            alt="Coolmastersmz"
            width={80}
            height={80}
            className="border-muted rounded-full border"
          />
          <span className="text-muted-foreground text-2xl font-bold">+</span>
          <Image
            src={betterAuthLogo}
            alt="Coolmastersmz"
            width={80}
            height={80}
            className="border-muted rounded-full border"
          />
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Coolmastersmz
        </h1>
        <p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
          Learn how to handle authentication in Next.js using Better-Auth with
          this tutorial by{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Coolmastersmz
          </Link>
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Entrar</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
