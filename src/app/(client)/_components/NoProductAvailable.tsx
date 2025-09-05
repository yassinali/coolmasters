"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-10 flex min-h-80 w-full flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 py-10 text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Sem produtos disponíveis
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Lamentamos, mas não há produtos correspondentes em{" "}
        <span className="text-darkColor text-base font-semibold">
          {selectedTab}
        </span>{" "}
        neste momento.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-shop_dark_green flex items-center space-x-2"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>A repor stock brevemente</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Por favor, volte mais tarde ou explore outras categorias de produtos.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
