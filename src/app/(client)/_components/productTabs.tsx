"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductTabs() {
  return (
    <Tabs defaultValue="description" className="w-full">
      {/* Header das Tabs */}
      <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1">
        <TabsTrigger
          value="description"
          className="data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="additional"
          className="data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Additional Information
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Reviews
        </TabsTrigger>
      </TabsList>

      {/* Conteúdo de cada Tab */}
      <TabsContent value="description" className="mt-4 space-y-4 text-gray-700">
        <p>
          In ducimus quod sed eum repellendus ea fugiat. Pariatur et illo at
          iure harum. Molestiae a itaque voluptas explicabo praesentium.
        </p>
        <p>
          Quam in facere soluta consequatur voluptatem beatae asperiores. Qui
          quia itaque illo eos quibusdam voluptatem et.
        </p>
        <p>
          Officia praesentium ipsam perferendis possimus ex culpa voluptatem
          dolore. Aut id sit et vitae.
        </p>
      </TabsContent>

      <TabsContent value="additional" className="mt-4 text-gray-700">
        <ul className="list-disc space-y-2 pl-5">
          <li>Material: 100% Cotton</li>
          <li>Size: Medium</li>
          <li>Color: Blue</li>
        </ul>
      </TabsContent>

      <TabsContent value="reviews" className="mt-4 text-gray-700">
        <p className="italic">Great product, very satisfied! - João</p>
        <p className="italic">Entrega rápida e qualidade excelente. - Maria</p>
      </TabsContent>
    </Tabs>
  );
}
