"use client"

import { useState } from 'react'
import { SchemaBuilder } from './schema-builder'
import { CodePreview } from './code-preview'
import { SchemaField } from '@/lib/types';

export default function BuilderSection() {
  const [fields, setFields] = useState<SchemaField[]>([]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SchemaBuilder fields={fields} setFields={setFields} />
      <div className="lg:sticky lg:top-6 h-fit">
        <CodePreview fields={fields} />
      </div>
    </div>
  )
}
