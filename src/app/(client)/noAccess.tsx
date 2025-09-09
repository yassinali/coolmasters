import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";

const NoAccess = async ({
  details = "Inicie sessão para ver os itens do seu carrinho e finalizar a compra. Não perca os seus produtos favoritos!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-12 md:py-32">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex flex-col items-center">
          <Logo />
          <CardTitle className="text-center text-2xl font-bold">
            Bem vindo!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-darkColor/80 text-center font-medium">{details}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-muted-foreground text-center text-sm">
            Entre em contacto com a nossa loja
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
