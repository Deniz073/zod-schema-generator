interface ValidationOption {
  value: string;
  label: string;
}

export function getValidationOptions(type: string): ValidationOption[] {
  const commonValidations: ValidationOption[] = [
    { value: "optional", label: "Optional" },
    { value: "nullable", label: "Nullable" },
    { value: "default", label: "Default" },
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
    ],
    number: [
      { value: "min", label: "Min Value" },
      { value: "max", label: "Max Value" },
      { value: "int", label: "Integer" },
      { value: "positive", label: "Positive" },
      { value: "negative", label: "Negative" },
      { value: "multipleOf", label: "Multiple Of" },
    ],
    array: [
      { value: "min", label: "Min Items" },
      { value: "max", label: "Max Items" },
      { value: "length", label: "Exact Length" },
      { value: "nonempty", label: "Non Empty" },
    ],
    date: [
      { value: "min", label: "Min Date" },
      { value: "max", label: "Max Date" },
    ],
  };

  return [...commonValidations, ...(typeSpecificValidations[type] || [])];
}