import React from 'react';
import { Control, Controller } from 'react-hook-form';

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  const ddd = digits.slice(0, 2);
  const nine = digits.slice(2, 3);
  const part1 = digits.slice(3, 7);
  const part2 = digits.slice(7, 11);

  let result = '';
  if (ddd) result += `(${ddd})`;
  if (nine) result += ` ${nine}`;
  if (part1) result += ` ${part1}`;
  if (part2) result += `-${part2}`;
  return result;
};

interface PhoneInputProps {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder?: string;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ name, control, placeholder = 'Telefone', className }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <input
        {...field}
        type="text"
        placeholder={placeholder}
        className={className}
        onChange={(e) => {
          const formatted = formatPhone(e.target.value);
          field.onChange(formatted);
        }}
        value={formatPhone(field.value ?? '')}
      />
    )}
  />
);

export default PhoneInput;
