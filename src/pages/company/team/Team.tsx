import React, { useState } from 'react';
import { Tag, Menu, Dropdown } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GET_TEAM_MEMBERS, POST_DELETE_TEAM_MEMBER, POST_MEMBER_STATUS } from '../../../api/PrivateApi';
import { toast } from 'react-toastify';
import { IoMdMore } from 'react-icons/io';
import CustomFilters from '../../../components/CustomFilters';
import AddTeamMemberModal from '../../../components/modals/AddTeamMember';
import DynamicTable from '../../../components/CustomTable';

export default function Team() {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 1,
        total: 0,
    });

    // Fetch team members
    const { data, isLoading } = useQuery(
        ["teamData", pagination.current, sort, search],
        () => GET_TEAM_MEMBERS(pagination.current, pagination.pageSize, search, sort ? "asc" : "desc"),
        { keepPreviousData: false }
    );

    pagination.total = data?.pagination.totalRecords || 0;

    // Mutation for deleting a team member
    const deleteMemberMutation = useMutation(POST_DELETE_TEAM_MEMBER, {
        onSuccess: () => {
            toast.success("Team member deleted successfully!");
            queryClient.invalidateQueries(["teamData"]);
        },
        onError: () => {
            toast.error("Failed to delete team member.");
        }
    });

    // Mutation for updating status
    const updateStatusMutation = useMutation(POST_MEMBER_STATUS, {
        onSuccess: () => {
            toast.success("Status updated successfully!");
            queryClient.invalidateQueries(["teamData"]);
        },
        onError: () => {
            toast.error("Failed to update status.");
        }
    });

    // Handle delete action
    const handleDelete = (id: any) => {
        deleteMemberMutation.mutate({ memberId: id });
    };

    // Handle status toggle
    const handleToggleStatus = (id: any, isActive: any) => {
        updateStatusMutation.mutate({ memberId: id, status: !isActive });
    };

    // Dropdown menu for actions
    const renderActionsDropdown = (item: any) => {
        const actionMenu = (
            <Menu className="min-w-[120px]">
                {userInfo?.user.role == 'team_member' ? null : (
                    <>
                        <Menu.Item key="toggleStatus" onClick={() => handleToggleStatus(item._id, item.isActive)}>
                            {item.isActive ? "Deactivate" : "Activate"}
                        </Menu.Item>
                        <Menu.Item key="delete" onClick={() => handleDelete(item._id)} className="text-red-500">
                            Delete
                        </Menu.Item>
                    </>
                )}
            </Menu>
        );

        return (
            <Dropdown overlay={actionMenu} placement="bottomRight" trigger={["click"]}>
                <button className="p-2 border rounded-md hover:bg-gray-200 text-2xl">
                    <IoMdMore />
                </button>
            </Dropdown>
        );
    };

    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "Role", dataIndex: "role" },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (value: any) => (
                <Tag color={value ? "green" : "yellow"}>{value ? "Active" : "Inactive"}</Tag>
            ),
        },
        {
            title: "Is Deleted",
            dataIndex: "is_deleted",
            render: (value: any) => (
                <Tag color={!value ? "green" : "red"}>{value ? "True" : "False"}</Tag>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (date: any) =>
                new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }).format(new Date(date)),
        },
        {
            title: "Action",
            render: (_: any, record: any) => <div>{renderActionsDropdown(record)}</div>,
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Team Management</h1>
                {userInfo?.user.role !== "team_member" && (
                    <button
                        className="bg-white text-gray-600 py-2 pl-4 pr-8 border border-gray-400 rounded flex items-center"
                        onClick={() => setIsModalVisible(true)}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add Team Member
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg">
                <CustomFilters title="All Team Members" setSearch={setSearch} sort={sort} setSort={setSort} />
                <DynamicTable
                    data={data?.data || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={isLoading}
                />
            </div>

            <AddTeamMemberModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={() => queryClient.invalidateQueries(["teamData"])}
                user={userInfo?.user}
            />
        </>
    );
}