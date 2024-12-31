interface ValidationOption {
  value: string;
  label: string;
}

export function getValidationOptions(type: string): ValidationOption[] {
  const commonValidations: ValidationOption[] = [
    { value: "optional", label: "Optional" },
    { value: "nullable", label: "Nullable" },
    { value: "default", label: "Default" },
    { value: "transform", label: "Transform" },
  ];

  const typeSpecificValidations: Record<string, ValidationOption[]> = {
    string: [
      { value: "min", label: "Min Length" },
      { value: "max", label: "Max Length" },
      { value: "length", label: "Exact Length" },
      { value: "email", label: "Email" },
      { value: "url", label: "URL" },
      { value: "uuid", label: "UUID" },
      { value: "regex", label: "Regex Pattern" },
      { value: "startsWith", label: "Starts With" },
      { value: "endsWith", label: "Ends With" },
      { value: "trim", label: "Trim" },
      { value: "toLowerCase", label: "To Lower Case" },
      { value: "toUpperCase", label: "To Upper Case" },
    ],
    number: [
      { value: "min", label: "Min Value" },
      { value: "max", label: "Max Value" },
      { value: "int", label: "Integer" },
      { value: "positive", label: "Positive" },
      { value: "negative", label: "Negative" },
      { value: "multipleOf", label: "Multiple Of" },
      { value: "finite", label: "Finite" },
      { value: "safe", label: "Safe Integer" },
    ],
    array: [
      { value: "min", label: "Min Items" },
      { value: "max", label: "Max Items" },
      { value: "length", label: "Exact Length" },
      { value: "nonempty", label: "Non Empty" },
      { value: "element", label: "Element Type" },
    ],
    date: [
      { value: "min", label: "Min Date" },
      { value: "max", label: "Max Date" },
    ],
    enum: [
      { value: "values", label: "Enum Values" },
    ],
    bigint: [
      { value: "min", label: "Min Value" },
      { value: "max", label: "Max Value" },
      { value: "positive", label: "Positive" },
      { value: "negative", label: "Negative" },
      { value: "multipleOf", label: "Multiple Of" },
    ],

    set: [
      { value: "min", label: "Min Size" },
      { value: "max", label: "Max Size" },
      { value: "size", label: "Exact Size" },
      { value: "nonempty", label: "Non Empty" },
    ],
  };

  return [...commonValidations, ...(typeSpecificValidations[type] || [])];
}