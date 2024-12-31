"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SchemaField } from "@/lib/types";

interface FieldParamsProps {
  field: SchemaField;
  onChange: (params: SchemaField["params"]) => void;
}

export function FieldParams({ field, onChange }: FieldParamsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`coerce-${field.id}`}
          checked={field.params.coerce}
          onCheckedChange={(checked) =>
            onChange({ ...field.params, coerce: checked === true })
          }
        />
        <Label htmlFor={`coerce-${field.id}`}>Coerce values</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`description-${field.id}`}>Description</Label>
        <Input
          id={`description-${field.id}`}
          value={field.params.description || ""}
          onChange={(e) =>
            onChange({ ...field.params, description: e.target.value })
          }
          placeholder="Schema description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`invalid-type-${field.id}`}>Invalid Type Error</Label>
        <Input
          id={`invalid-type-${field.id}`}
          value={field.params.invalid_type_error || ""}
          onChange={(e) =>
            onChange({ ...field.params, invalid_type_error: e.target.value })
          }
          placeholder="Error when type is invalid"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`required-${field.id}`}>Required Error</Label>
        <Input
          id={`required-${field.id}`}
          value={field.params.required_error || ""}
          onChange={(e) =>
            onChange({ ...field.params, required_error: e.target.value })
          }
          placeholder="Error when field is required but missing"
        />
      </div>
    </div>
  );
}