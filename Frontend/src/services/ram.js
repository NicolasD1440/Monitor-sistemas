import api from "./api";

export const getRamUsage = async () => {
    const response = await api.get("/monitor/api/ram");
    return response.data;
};