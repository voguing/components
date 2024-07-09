import { Table } from '@vogue/components';

export default () => (
  <Table
    columns={[
      { header: 'ID', accessorKey: 'id' },
      { header: '名称', accessorKey: 'name' },
      { header: '年龄', accessorKey: 'age' },
    ]}
    data={[{ name: '海峰', age: 24, id: 1 }]}
  />
);
