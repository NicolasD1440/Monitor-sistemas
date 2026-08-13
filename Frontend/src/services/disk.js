import api from "./api";

export const getDiskUsage = async () => {
    const response = await api.get("/monitor/api/disk");
    return response.data;
};