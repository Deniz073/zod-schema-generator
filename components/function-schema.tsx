"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { SchemaField, FunctionParameter } from "@/lib/types";

interface FunctionSchemaProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function FunctionSchema({ field, onChange }: FunctionSchemaProps) {
  const addParameter = () => {
    const params = field.params.functionParams || [];
    onChange({
      params: {
        ...field.params,
        functionParams: [
          ...params,
          {
            name: "",
            type: "string",
            optional: false,
          },
        ],
      },
    });
  };

  const updateParameter = (index: number, updates: Partial<FunctionParameter>) => {
    const params = field.params.functionParams || [];
    onChange({
      params: {
        ...field.params,
        functionParams: params.map((p, i) =>
          i === index ? { ...p, ...updates } : p
        ),
      },
    });
  };

  const removeParameter = (index: number) => {
    const params = field.params.functionParams || [];
    onChange({
      params: {
        ...field.params,
        functionParams: params.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Function Parameters</Label>
          <Button onClick={addParameter} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Parameter
          </Button>
        </div>

        {(field.params.functionParams || []).map((param, index) => (
          <div key={index} className="grid grid-cols-[2fr,2fr,1fr,auto] gap-2 items-center">
            <Input
              value={param.name}
              onChange={(e) => updateParameter(index, { name: e.target.value })}
              placeholder="Parameter name"
            />
            <Select
              value={param.type}
              onValueChange={(value) => updateParameter(index, { type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="object">Object</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`optional-${index}`}
                checked={param.optional}
                onCheckedChange={(checked) =>
                  updateParameter(index, { optional: checked === true })
                }
              />
              <Label htmlFor={`optional-${index}`}>Optional</Label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeParameter(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Return Type</Label>
        <Select
          value={field.params.returnType || "void"}
          onValueChange={(value) =>
            onChange({
              params: { ...field.params, returnType: value },
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
            <SelectItem value="object">Object</SelectItem>
            <SelectItem value="void">Void</SelectItem>
            <SelectItem value="any">Any</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}