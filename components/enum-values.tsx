"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface EnumValuesProps {
  values: string[];
  onChange: (values: string[]) => void;
}

export function EnumValues({ values, onChange }: EnumValuesProps) {
  const [newValue, setNewValue] = useState("");

  const addValue = () => {
    if (newValue.trim()) {
      onChange([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Enum Values</Label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input value={value} readOnly />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeValue(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Add enum value"
            onKeyDown={(e) => e.key === "Enter" && addValue()}
          />
          <Button onClick={addValue} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}