import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloudDownloadOutline, IoFilter, IoSwapVertical } from "react-icons/io5";

export default function CustomFilters({ title, setSearch, sort, setSort }) {
    const [input, setInput] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        setSearch(input.trim());
    };

    return (
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center justify-end p-4">
            {/* Search and Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                {/* Search Box */}
                <div className="relative flex-grow md:flex-grow-0">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xl">
                        <CiSearch />
                    </span>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={input}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full md:w-52 border rounded-md text-sm bg-white text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-indigo-400"
                    />
                </div>

                {/* Filter Button */}
                <button
                    className="p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 text-xl flex-shrink-0"
                    onClick={handleSearch}
                >
                    <IoFilter />
                </button>

                {/* Sort Button */}
                <button
                    className="p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 text-xl flex-shrink-0"
                    onClick={() => setSort(!sort)}
                >
                    <IoSwapVertical />
                </button>

                {/* Export Button */}
                <button
                    className="p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 flex items-center flex-shrink-0"
                >
                    <IoCloudDownloadOutline className="text-xl" />
                    <span className="ml-2 hidden sm:inline">Export</span>
                </button>
            </div>
        </div>
    );
}
