import Container from "@/components/Container";
import { Title } from "@/components/text";
import DealListServer from "../_components/deal-list-server";

// This file is now a Server Component by default

const DealPage = () => {
  return (
    <div className="bg-deal-bg py-10">
      <Container>
        <Title className="mb-5 text-base tracking-wide uppercase underline decoration-[1px] underline-offset-4">
          Novidades da Semana
        </Title>
        <DealListServer />
      </Container>
    </div>
  );
};

export default DealPage;
