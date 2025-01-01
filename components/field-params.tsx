
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SchemaField } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";


interface FieldParamsProps {
  field: SchemaField;
  onChange: (params: SchemaField["params"]) => void;
}

export function FieldParams({ field, onChange }: FieldParamsProps) {
  const addUnionType = () => {
    const currentTypes = field.params.unionTypes || [];
    if (currentTypes.length < 5) { // Limit to 5 union types for simplicity
      onChange({
        ...field.params,
        unionTypes: [...currentTypes, "string"],
      });
    }
  };

  const updateUnionType = (index: number, type: string) => {
    const currentTypes = field.params.unionTypes || [];
    const newTypes = [...currentTypes];
    newTypes[index] = type;
    onChange({
      ...field.params,
      unionTypes: newTypes,
    });
  };

  const removeUnionType = (index: number) => {
    const currentTypes = field.params.unionTypes || [];
    onChange({
      ...field.params,
      unionTypes: currentTypes.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        <AccordionItem value="datetime-ip" className="py-2">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-3 py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
              General
              <Plus
                size={16}
                strokeWidth={2}
                className="shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="pb-2 space-y-3 ps-7">
            <div className="flex items-center space-x-2 mt-2">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      {field.type !== 'enum' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Union Types</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addUnionType}
              disabled={(field.params.unionTypes?.length || 0) >= 5}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Type
            </Button>
          </div>
          <div className="space-y-2">
            {(field.params.unionTypes || []).map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Select
                  value={type}
                  onValueChange={(value) => updateUnionType(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="null">Null</SelectItem>
                    <SelectItem value="undefined">Undefined</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeUnionType(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}