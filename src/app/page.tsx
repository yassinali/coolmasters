import betterAuthLogo from "@/assets/better_auth_logo.png";
import codingInFlowLogo from "@/assets/coding_in_flow_logo.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
       
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Coolmastersmz
        </h1>
        <p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
         Em manutencao
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          
          <Button asChild variant="outline">
            <Link href="/sign-in">Entrar</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
