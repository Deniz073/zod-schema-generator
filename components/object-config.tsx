"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { SchemaField } from "@/lib/types";

interface ObjectConfigProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function ObjectConfig({ field, onChange }: ObjectConfigProps) {
  const addField = () => {
    const currentFields = field.params.pickOmitFields || [];
    onChange({
      params: {
        ...field.params,
        pickOmitFields: [...currentFields, ""],
      },
    });
  };

  const updateField = (index: number, value: string) => {
    const currentFields = field.params.pickOmitFields || [];
    const newFields = [...currentFields];
    newFields[index] = value;
    onChange({
      params: {
        ...field.params,
        pickOmitFields: newFields,
      },
    });
  };

  const removeField = (index: number) => {
    const currentFields = field.params.pickOmitFields || [];
    onChange({
      params: {
        ...field.params,
        pickOmitFields: currentFields.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {!field.params.isDiscriminatedUnion && (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id={`is-strict-${field.id}`}
                checked={field.params.isStrict}
                onCheckedChange={(checked) =>
                  onChange({
                    params: { ...field.params, isStrict: checked },
                  })
                }
              />
              <Label htmlFor={`is-strict-${field.id}`}>Strict Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id={`is-passthrough-${field.id}`}
                checked={field.params.isPassthrough}
                onCheckedChange={(checked) =>
                  onChange({
                    params: { ...field.params, isPassthrough: checked },
                  })
                }
              />
              <Label htmlFor={`is-passthrough-${field.id}`}>Passthrough</Label>
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <Switch
            id={`is-discriminated-${field.id}`}
            checked={field.params.isDiscriminatedUnion}
            onCheckedChange={(checked) =>
              onChange({
                params: {
                  ...field.params,
                  isDiscriminatedUnion: checked,
                  // Reset these options when switching to discriminated union
                  isStrict: checked ? false : field.params.isStrict,
                  isPassthrough: checked ? false : field.params.isPassthrough,
                  pickOmitFields: checked ? undefined : field.params.pickOmitFields,
                  pickOmitType: checked ? undefined : field.params.pickOmitType,
                },
              })
            }
          />
          <Label htmlFor={`is-discriminated-${field.id}`}>Is Discriminated Union</Label>
        </div>
      </div>

      {!field.params.isDiscriminatedUnion && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Pick/Omit</Label>
            <Select
              value={field.params.pickOmitType || "pick"}
              onValueChange={(value: "pick" | "omit") =>
                onChange({
                  params: { ...field.params, pickOmitType: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pick">Pick</SelectItem>
                <SelectItem value="omit">Omit</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={addField}>
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>

          {(field.params.pickOmitFields || []).map((fieldName, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={fieldName}
                onChange={(e) => updateField(index, e.target.value)}
                placeholder="Field name"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeField(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}