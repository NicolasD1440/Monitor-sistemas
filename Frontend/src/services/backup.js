import api from "./api.js";

export const backupOCI = async () => {
    const response = await api.post("/monitor/api/backup");
    return response.data;
};

export const getBackups = async () => {
    const response = await api.get("/monitor/api/backups");
    return response.data;
};