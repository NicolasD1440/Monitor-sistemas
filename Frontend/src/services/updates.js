import api from "./api";

export const getUpdates = async () => {
    const response = await api.get("/monitor/updates");
    return response.data;
};

export const applyUpdates = async () => {
    const response = await api.post("/monitor/update");
    return response.data;
};