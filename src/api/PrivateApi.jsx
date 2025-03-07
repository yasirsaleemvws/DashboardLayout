import { PrivateAxiosInstance } from "../config/axios";

export const GET__PARKING_LIST = async (page, rowsPerPage) => {
    try {
        const response = await PrivateAxiosInstance.get(`/parking-list?page=${page}&limit=${rowsPerPage}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_PASSWORD = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`/update-password`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_COMPANY_PROFILE = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/update-company`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_PROFILE = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`auth/update-profile`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_NOTIFICATION_PREFERENCES = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`notifications/update-notification-preferences`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_DISPLAY_MODE = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`settings/set-display-mode`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_PROFILE_INFO = async () => {
    try {
        const response = await PrivateAxiosInstance.get(`settings/fetch-user-settings`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_TEAM_MEMBERS = async (page, limit, search, sort) => {
    try {
        const response = await PrivateAxiosInstance.get(`companies/fetch-team-members?page=${page}&limit=${limit}&search=${search}&sortOrder=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_TEAM_MEMBER = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/add-team-member`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_DELETE_TEAM_MEMBER = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/remove-team-member`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_MEMBER_STATUS = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/update-member-status`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_PARKER_MEMBER_STATUS = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/update-member-status`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_PARKER_MEMBERS = async (page, limit, search, sort, type) => {
    try {
        const response = await PrivateAxiosInstance.get(`parker?page=${page}&limit=${limit}&search=${search}&sortOrder=${sort}&type=${type}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_PARKING_AREAS = async () => {
    try {
        const response = await PrivateAxiosInstance.get(`companies/get-parking-areas`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_PARKING_AREAS_SLOTS = async (id) => {
    try {
        const response = await PrivateAxiosInstance.get(`companies/get-parking-slots?parkingAreaId=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_PARKING_AREAS = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/add-parking-area`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_AVAILABLE_PARKING_SLOTS = async () => {
    try {
        const response = await PrivateAxiosInstance.get(`companies/get-available-parking-slots`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_MANUAL_PARKER = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/add-manual-parker`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const GET_MANUAL_PARKER = async (page, limit, search, sort) => {
    try {
        const response = await PrivateAxiosInstance.get(`companies/get-manual-parker?page=${page}&limit=${limit}&search=${search}&sortOrder=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const POST_UPDATE_MANUAL_PARKER = async (data) => {
    try {
        const response = await PrivateAxiosInstance.post(`companies/update-manual-parker`, data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

