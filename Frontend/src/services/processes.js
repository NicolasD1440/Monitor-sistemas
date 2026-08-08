import api from "./api";

export const getProcesses = async () => {
    const response = await api.get("/monitor/processes");
    return response.data;
};