"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ValidationBuilder } from "./validation-builder";
import { FieldParams } from "./field-params";
import type { SchemaField } from "@/lib/types";

interface FieldBuilderProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function FieldBuilder({ field, onChange }: FieldBuilderProps) {
  return (
    <div className="space-y-4 p-4 rounded-lg border">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`field-name-${field.id}`}>Field Name</Label>
          <Input
            id={`field-name-${field.id}`}
            value={field.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g., email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`field-type-${field.id}`}>Type</Label>
          <Select
            value={field.type}
            onValueChange={(value) => onChange({ type: value })}
          >
            <SelectTrigger id={`field-type-${field.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="array">Array</SelectItem>
              <SelectItem value="object">Object</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <FieldParams
        field={field}
        onChange={(params) => onChange({ params })}
      />

      <ValidationBuilder
        type={field.type}
        validations={field.validations}
        onChange={(validations) => onChange({ validations })}
      />
    </div>
  );
}