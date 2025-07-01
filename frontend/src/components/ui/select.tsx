import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AnimatedSelectProps {
  value: string;
  display: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Select({
  value,
  options,
  display,
  onChange,
}: AnimatedSelectProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (open && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }, [open]);

  return (
    <div className="relative w-full max-w-sm">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center w-full rounded-md border border-gray-300 px-3 py-2 text-left text-sm bg-white  transition-all focus:transition-none  focus:outline-gray-400 focus:outline-2 focus:ring-1 focus:ring-gray-300 focus:outline-offset-2 text-gray-400"
      >
        {value || display}
        <ChevronDown
          className={`h-4 w-4 ml-2 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <ul
          ref={dropdownRef}
          className={`absolute z-10 w-full rounded-md  bg-white shadow-lg transition-all duration-200 animate-fade-in overflow-y-auto  ${
            position === "top" ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          {options.map((type) => (
            <li
              key={type}
              className="cursor-pointer font-medium px-4 py-2 text-sm hover:bg-gray-100 transition-colors rounded-md"
              onClick={() => {
                onChange(type);
                setOpen(false);
              }}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
