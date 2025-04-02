import { tv } from "tailwind-variants";

export const button = tv({
    base: "inline-flex items-center justify-center font-medium transition-colors px-6 py-3 text-base min-h-[44px]",
    variants: {
      color: {
        default: "bg-gray-100 text-black dark:bg-gray-800 dark:text-white",
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500",
        danger: "bg-red-500 text-white hover:bg-red-600",
        customGreen: "bg-[#2ecc71] text-black hover:bg-[#27ae60] dark:text-white dark:bg-[#29b765] dark:hover:bg-[#1e8449]",
      },
      radius: {
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      variant: {
        shadow: "shadow-lg",
        bordered:
          "border-2 bg-transparent text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black",
        flat: "bg-opacity-70 shadow-none",
      },
      size: {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      color: "default",
      radius: "md",
      variant: "shadow",
      size: "md",
    },
  });
  