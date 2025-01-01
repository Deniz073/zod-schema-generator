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
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "lucide-react";

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
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        <AccordionItem value="datetime-ip" className="py-2">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-3 py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
              DateTime & IP Options
              <Plus
                size={16}
                strokeWidth={2}
                className="shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="pb-2 ps-7 space-y-2">
            <div className="space-y-2 mt-2">
              <Label>Datetime validation</Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.params.stringOptions?.datetime?.offset || false}
                    onCheckedChange={(checked) =>
                      updateDatetimeOptions({ offset: checked })
                    }
                  />

                </div>
                <Label>Allow Timezone Offset</Label>
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
                onValueChange={(value: 'v4' | 'v6' | "any") =>
                  updateIpOptions(value !== "any" ? value : undefined)
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

