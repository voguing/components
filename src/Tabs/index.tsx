import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs as UITabs,
} from '@/components/ui/tabs';
import React from 'react';

export const Tabs: React.FC<{
  items?: Array<{
    value?: string;
    title?: string;
    children?: React.ReactNode;
  }>;
  onValueChange?: (value: string) => void;
  value?: string;
  extra?: React.ReactNode;
}> = ({ items, extra, onValueChange, value }) => {
  return (
    <UITabs
      defaultValue={items?.[0]?.value || '0'}
      className="pb-3"
      onValueChange={onValueChange}
      value={value}
    >
      <div className="flex items-center">
        <TabsList>
          {items?.map((item, index) => {
            return (
              <TabsTrigger key={item.value} value={item.value || `${index}`}>
                {item.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {extra && (
          <div className="ml-auto flex items-center gap-2">{extra}</div>
        )}
      </div>
      {items?.map((item, index) => {
        return (
          <TabsContent key={item.value} value={item.value || `${index}`}>
            {item.children}
          </TabsContent>
        );
      })}
    </UITabs>
  );
};
