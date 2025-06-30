"use client";

import { cn } from "@/libs/utils";
import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base transition placeholder:text-gray-400 placeholder:text-sm  focus:transition-none  focus:outline-gray-400 focus:outline-2 focus:ring-1 focus:ring-gray-300 focus:outline-offset-2",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
