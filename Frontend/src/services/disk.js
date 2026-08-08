import api from "./api";

export const getDiskUsage = async () => {
    const response = await api.get("/monitor/disk");
    return response.data;
};