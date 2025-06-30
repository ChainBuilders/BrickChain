import { cn } from "@/libs/utils";
import React from "react";

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}
const Label: React.FC<LabelProps> = ({ children, htmlFor, className }) => {
  return (
    <label
      className={cn("block text-x font-medium text-black/80", className)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
export default Label;
