import api from "./api";

export const getCpuUsage = async () => {
    const response = await api.get("/monitor/api/cpu");
    return response.data;
};