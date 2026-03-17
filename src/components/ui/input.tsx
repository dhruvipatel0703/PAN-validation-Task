import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
    React.ElementRef<"input">,
    React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
