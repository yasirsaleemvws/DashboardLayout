import React from 'react';

const DynamicTable = ({ data, columns, pagination, setPagination, loading }) => {
  const { current, pageSize, total } = pagination;

  // Calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  // Handle page change
  const handlePageChange = (page: any) => {
    setPagination((prev: any) => ({ ...prev, current: page }));
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (current > 1) {
      setPagination((prev: any) => ({ ...prev, current: prev.current - 1 }));
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (current < totalPages) {
      setPagination((prev: any) => ({ ...prev, current: prev.current + 1 }));
    }
  };

  return (
    <div className="bg-white dark:bg-black shadow-md rounded-lg">
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center p-5">
          <span className="animate-spin border-4 border-primary border-t-transparent rounded-full w-10 h-10"></span>
        </div>
      )}

      {/* Table */}
      {!loading && data.length === 0 ? (
        <div className="text-center p-5 text-gray-500">No data available</div>
      ) : (
        <div className="table-responsive mb-5">
          <table>
            <thead>
              <tr>
                {columns.map((column: any) => (
                  <th key={column.title}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  {columns.map((column: any) => (
                    <td key={column.dataIndex}>
                      {column.render
                        ? column.render(item[column.dataIndex], item)
                        : item[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className='flex justify-end border-t'>
          <div className="p-4  border-gray-200 dark:border-gray-700">
            <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto">
              {/* Previous Button */}
              <li>
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={current === 1}
                  className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition ${current === page
                      ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                      : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                      }`}
                  >
                    {page}
                  </button>
                </li>
              ))}

              {/* Next Button */}
              <li>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={current === totalPages}
                  className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;