import api from "./api";

export const getProcesses = async () => {
    const response = await api.get("/monitor/api/processes");
    return response.data;
};