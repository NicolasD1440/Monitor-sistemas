import api from "./api";

export const checkUpdates = async () => {
    const response = await api.get("/monitor/api/updates");
    return response.data;
};

export const updateSystem = async () => {
    const response = await api.post("/monitor/api/update");
    return response.data;
};