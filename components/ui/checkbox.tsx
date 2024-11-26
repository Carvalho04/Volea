"use client"

import * as React from "react"
import { Check } from 'lucide-react'

import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "w-4 h-4 border border-primary rounded-sm peer-checked:bg-primary peer-checked:border-primary",
            "flex items-center justify-center",
            "transition-colors duration-200 ease-in-out",
            className
          )}>
            <Check className="h-3 w-3 text-primary-foreground hidden peer-checked:block" />
          </div>
        </div>
        {label && <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
