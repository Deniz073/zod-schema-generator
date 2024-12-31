"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { FieldBuilder } from "./field-builder";
import type { SchemaField } from "@/lib/types";

interface DiscriminatedUnionProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function DiscriminatedUnion({ field, onChange }: DiscriminatedUnionProps) {
  const discriminatedUnion = field.params.discriminatedUnion || {
    discriminator: 'type',
    cases: {},
  };

  const addCase = () => {
    const caseKey = `case${Object.keys(discriminatedUnion.cases).length + 1}`;
    onChange({
      params: {
        ...field.params,
        discriminatedUnion: {
          ...discriminatedUnion,
          cases: {
            ...discriminatedUnion.cases,
            [caseKey]: {
              value: caseKey,
              fields: [],
            },
          },
        },
      },
    });
  };

  const addField = (caseKey: string) => {
    const newField: SchemaField = {
      id: crypto.randomUUID(),
      name: '',
      type: 'string',
      validations: [],
      params: {},
    };

    onChange({
      params: {
        ...field.params,
        discriminatedUnion: {
          ...discriminatedUnion,
          cases: {
            ...discriminatedUnion.cases,
            [caseKey]: {
              ...discriminatedUnion.cases[caseKey],
              fields: [...discriminatedUnion.cases[caseKey].fields, newField],
            },
          },
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Discriminator Field</Label>
        <Input
          value={discriminatedUnion.discriminator}
          onChange={(e) =>
            onChange({
              params: {
                ...field.params,
                discriminatedUnion: {
                  ...discriminatedUnion,
                  discriminator: e.target.value,
                },
              },
            })
          }
          placeholder="e.g., type"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Cases</Label>
          <Button onClick={addCase} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Case
          </Button>
        </div>

        {Object.entries(discriminatedUnion.cases).map(([key, caseData]) => (
          <div key={key} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Input
                value={caseData.value}
                onChange={(e) =>
                  onChange({
                    params: {
                      ...field.params,
                      discriminatedUnion: {
                        ...discriminatedUnion,
                        cases: {
                          ...discriminatedUnion.cases,
                          [key]: {
                            ...caseData,
                            value: e.target.value,
                          },
                        },
                      },
                    },
                  })
                }
                placeholder="Case value"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => addField(key)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </div>

            {caseData.fields.map((subField, index) => (
              <FieldBuilder
                key={subField.id}
                field={subField}
                onChange={(updates) =>
                  onChange({
                    params: {
                      ...field.params,
                      discriminatedUnion: {
                        ...discriminatedUnion,
                        cases: {
                          ...discriminatedUnion.cases,
                          [key]: {
                            ...caseData,
                            fields: caseData.fields.map((f, i) =>
                              i === index ? { ...f, ...updates } : f
                            ),
                          },
                        },
                      },
                    },
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}