import api from "./api";

export const checkUpdates = async () => {
    const response = await api.get("/monitor/updates");
    return response.data;
};

export const updateSystem = async () => {
    const response = await api.post("/monitor/updates");
    return response.data;
};

