import { Accordion, AccordionItem } from "@/components/ui/accordion";

import React from "react";

const ProductCharacteristics = async () => {
  // const brand = await getBrand(product?.slug as string);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1"></AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
