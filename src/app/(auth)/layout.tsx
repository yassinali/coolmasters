import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "../globals.css";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect("/dashboard");

  return (
    // Apenas renderize os filhos diretamente
    <>{children}</>
  );
}
