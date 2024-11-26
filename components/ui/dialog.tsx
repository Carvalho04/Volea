import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

// Dialog Container
const Dialog = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onOpenChange?: (open: boolean) => void }
>(({ children, onOpenChange, ...props }, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen); // Chama o callback se for passado
  };

  return (
    <div
      ref={ref}
      {...props}
      className={cn("dialog-container", open ? "open" : "closed")}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              open,
              setOpen: handleOpenChange,
            })
          : child
      )}
    </div>
  );
});
Dialog.displayName = "Dialog";

// Dialog Content
const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-lg shadow-lg w-full max-w-md p-6",
      className
    )}
    {...props}
  />
));
DialogContent.displayName = "DialogContent";

// Dialog Header
const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b pb-4 mb-4", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

// Dialog Title
const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold text-gray-800 leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// Dialog Footer
const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-end gap-4 pt-4 border-t mt-4", className)}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

// Dialog Trigger
const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});
DialogTrigger.displayName = "DialogTrigger";

// Exports
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
};
