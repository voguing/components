import { CardDescription } from '@/components/ui/card';
import clsx from 'clsx';

export type CardProps = {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  footerClassName?: string;
};

export const Card = (props: CardProps) => {
  const {
    title,
    description,
    extra,
    children,
    footer,
    className,
    footerClassName,
  } = props;

  return (
    <div
      className={clsx(
        className,
        'p-4 bg-white rounded-xl shadow-xl flex flex-col gap-4',
      )}
    >
      {(title || description) && (
        <div className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            {title && <div className="font-bold text-lg">{title}</div>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div>{extra}</div>
        </div>
      )}
      {children && <div>{children}</div>}
      {footer && <div className={clsx(footerClassName)}>{footer}</div>}
    </div>
  );
};
