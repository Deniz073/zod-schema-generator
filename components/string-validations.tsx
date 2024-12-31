// components/string-validations.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { SchemaField } from "@/lib/types";

interface StringValidationsProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

interface DateTimeOptions {
  offset?: boolean;
  precision?: number;
}

export function StringValidations({ field, onChange }: StringValidationsProps) {
  const updateDatetimeOptions = (updates: Partial<DateTimeOptions>) => {
    onChange({
      params: {
        ...field.params,
        stringOptions: {
          ...field.params.stringOptions,
          datetime: {
            ...(field.params.stringOptions?.datetime || {}),
            ...updates,
          },
        },
      },
    });
  };

  const updateIpOptions = (version: 'v4' | 'v6' | undefined) => {
    onChange({
      params: {
        ...field.params,
        stringOptions: {
          ...field.params.stringOptions,
          ip: {
            ...(field.params.stringOptions?.ip || {}),
            version,
          },
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>DateTime Options</Label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.params.stringOptions?.datetime?.offset || false}
              onCheckedChange={(checked) =>
                updateDatetimeOptions({ offset: checked })
              }
            />
            <Label>Allow Timezone Offset</Label>
          </div>
          <Input
            type="number"
            value={field.params.stringOptions?.datetime?.precision || 0}
            onChange={(e) =>
              updateDatetimeOptions({ precision: parseInt(e.target.value) || 0 })
            }
            placeholder="Precision"
            className="w-24"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>IP Version</Label>
        <Select
          value={field.params.stringOptions?.ip?.version || ""}
          onValueChange={(value: 'v4' | 'v6' | "") =>
            updateIpOptions(value || undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any version</SelectItem>
            <SelectItem value="v4">IPv4 Only</SelectItem>
            <SelectItem value="v6">IPv6 Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}