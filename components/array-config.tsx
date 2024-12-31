"use client";

import { Button } from "@/components/ui/button";
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

interface ArrayConfigProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function ArrayConfig({ field, onChange }: ArrayConfigProps) {
  const addTupleType = () => {
    const currentTypes = field.params.tupleTypes || [];
    onChange({
      params: {
        ...field.params,
        tupleTypes: [...currentTypes, "string"],
      },
    });
  };

  const updateTupleType = (index: number, type: string) => {
    const currentTypes = field.params.tupleTypes || [];
    const newTypes = [...currentTypes];
    newTypes[index] = type;
    onChange({
      params: {
        ...field.params,
        tupleTypes: newTypes,
      },
    });
  };

  const removeTupleType = (index: number) => {
    const currentTypes = field.params.tupleTypes || [];
    onChange({
      params: {
        ...field.params,
        tupleTypes: currentTypes.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id={`is-tuple-${field.id}`}
          checked={field.params.isTuple}
          onCheckedChange={(checked) =>
            onChange({
              params: { ...field.params, isTuple: checked },
            })
          }
        />
        <Label htmlFor={`is-tuple-${field.id}`}>Is Tuple</Label>
      </div>

      {field.params.isTuple ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Tuple Types</Label>
            <Button variant="outline" size="sm" onClick={addTupleType}>
              <Plus className="w-4 h-4 mr-2" />
              Add Type
            </Button>
          </div>
          {(field.params.tupleTypes || []).map((type, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Select
                value={type}
                onValueChange={(value) => updateTupleType(index, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTupleType(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Element Type</Label>
          <Select
            value={field.params.elementType || "string"}
            onValueChange={(value) =>
              onChange({
                params: { ...field.params, elementType: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}