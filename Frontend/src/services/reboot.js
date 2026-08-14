import api from "./api";

export const rebootSystem = async () => {
    const response = await api.post("/monitor/api/reboot");
    return response.data;
};