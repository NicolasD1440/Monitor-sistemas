import api from "./api";

export const getSpaceDisk = async () => {
    const response = await api.get("/monitor/api/space-disk");
    return response.data;
};