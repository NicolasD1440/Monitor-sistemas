import api from "./api.js";

export const backupOCI = async () => {
    const response = await api.post("/monitor/api/backup");

    return response.data;
};