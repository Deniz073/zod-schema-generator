"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { FieldBuilder } from "./field-builder";
import type { SchemaField } from "@/lib/types";

interface SchemaBuilderProps {
  fields: SchemaField[];
  setFields: (fields: SchemaField[]) => void;
}

export function SchemaBuilder({ fields, setFields }: SchemaBuilderProps) {
  const addField = () => {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        name: "",
        type: "string",
        validations: [],
        params: {},
      },
    ]);
  };

  const updateField = (id: string, field: Partial<SchemaField>) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, ...field } : f))
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Schema Builder</h2>
        <Button onClick={addField} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="relative">
            <FieldBuilder
              field={field}
              onChange={(updates) => updateField(field.id, updates)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2"
              onClick={() => removeField(field.id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Add a field to start building your schema
          </div>
        )}
      </div>
    </Card>
  );
}