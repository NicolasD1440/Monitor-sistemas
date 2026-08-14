import api from "./api.js";

export const backupOCI = async () => {
    const response = await api.post("/backup");

    return response.data;
};