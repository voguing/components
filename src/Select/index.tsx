import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from '@/components/ui/select';
import clsx from 'clsx';
import { ReactNode } from 'react';

export type SelectProps = {
  options?: { label: ReactNode; value: any }[];
  className?: string;
};

export const Select = (props: SelectProps) => {
  const { options, className, ...rest } = props;

  return (
    <UISelect {...rest}>
      <SelectTrigger
        className={clsx(className, 'data-[placeholder]:text-slate-500')}
      >
        <SelectValue placeholder="请选择" />
      </SelectTrigger>
      <SelectContent>
        {options?.map(({ label, value }, index) => {
          return (
            <SelectItem value={value} key={value || `$${index}`}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </UISelect>
  );
};
