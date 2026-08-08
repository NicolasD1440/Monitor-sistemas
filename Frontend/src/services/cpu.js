import api from "./api";

export const getCpuUsage = async () => {
    const response = await api.get("/monitor/cpu");
    return response.data;
};