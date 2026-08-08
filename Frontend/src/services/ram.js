import api from "./api";

export const getRamUsage = async () => {
    const response = await api.get("/monitor/ram");
    return response.data;
};