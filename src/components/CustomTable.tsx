import { Table } from "antd";

const CustomTable: any = ({
  data,
  columns,
  pagination,
  setPagination,
  loading,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 800 }}
      rowKey={(record) => (record?.id ? record.id.toString() : `row-${Math.random()}`)} // Ensure fallback key
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: (page, pageSize) =>
          setPagination({ ...pagination, current: page, pageSize }),
      }}
    />

  );
};

export default CustomTable;