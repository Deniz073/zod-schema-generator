"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { ValidationRule } from "@/lib/types";
import { getValidationOptions } from "@/lib/validation-options";

interface ValidationBuilderProps {
  type: string;
  validations: ValidationRule[];
  onChange: (validations: ValidationRule[]) => void;
}

export function ValidationBuilder({
  type,
  validations,
  onChange,
}: ValidationBuilderProps) {
  const validationOptions = getValidationOptions(type);

  const addValidation = () => {
    const firstOption = validationOptions[0];
    onChange([
      ...validations,
      {
        id: crypto.randomUUID(),
        type: firstOption.value,
        message: "",
        value: "",
      },
    ]);
  };

  const updateValidation = (id: string, updates: Partial<ValidationRule>) => {
    onChange(
      validations.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const removeValidation = (id: string) => {
    onChange(validations.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Validations</h3>
        <Button onClick={addValidation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Validation
        </Button>
      </div>

      <div className="space-y-3">
        {validations.map((validation) => (
          <div
            key={validation.id}
            className="grid grid-cols-[1fr,1fr,1fr,auto] gap-2 items-start"
          >
            <Select
              value={validation.type}
              onValueChange={(value) =>
                updateValidation(validation.id, { type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              value={validation.value}
              onChange={(e) =>
                updateValidation(validation.id, { value: e.target.value })
              }
              placeholder="Value"
            />

            <Input
              value={validation.message}
              onChange={(e) =>
                updateValidation(validation.id, { message: e.target.value })
              }
              placeholder="Error message (optional)"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeValidation(validation.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}