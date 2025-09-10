"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
  const pathname = usePathname();

  return (
    <Container className="flex min-h-[70vh] items-center justify-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-shop_light_green text-2xl font-semibold">
            401 - Nao autorizado
          </h1>
          <p className="text-muted-foreground">
            Porfavor, faca login para ter acesso.
          </p>
        </div>
        <div>
          <Button
            asChild
            className="bg-shop_light_green hover:bg-shop_light_green/60 w-full"
          >
            <Link href={`/sign-in?redirect=${pathname}`}>Entrar</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
