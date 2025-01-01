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
import { EnumValues } from "./enum-values";
import { ArrayConfig } from "./array-config";
import { ObjectConfig } from "./object-config";
import { DiscriminatedUnion } from "./discriminated-unions";
import { FunctionSchema } from "./function-schema";
import { StringValidations } from "./string-validations";
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
              <SelectItem value="enum">Enum</SelectItem>
              <SelectItem value="function">Function</SelectItem>
              <SelectItem value="bigint">BigInt</SelectItem>
              <SelectItem value="record">Record</SelectItem>
              <SelectItem value="map">Map</SelectItem>
              <SelectItem value="set">Set</SelectItem>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
              <SelectItem value="void">Void</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {field.type === 'array' && (
        <ArrayConfig field={field} onChange={onChange} />
      )}

      {field.type === 'object' && (
        <ObjectConfig field={field} onChange={onChange} />
      )}

      {field.type === 'enum' && (
        <EnumValues
          values={field.params.enumValues || []}
          onChange={(values) =>
            onChange({
              params: { ...field.params, enumValues: values }
            })
          }
        />
      )}

      {field.type === 'function' && (
        <FunctionSchema field={field} onChange={onChange} />
      )}

      {field.params.isDiscriminatedUnion && (
        <DiscriminatedUnion field={field} onChange={onChange} />
      )}

      {field.type === 'string' && (
        <StringValidations field={field} onChange={onChange} />
      )}

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