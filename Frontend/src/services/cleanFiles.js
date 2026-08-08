import api from "./api";

export const getFilesToClean  = async () => {
    const response = await api.get("/monitor/clean-files");
    return response.data;
};

export const cleanFiles  = async () => {
    const response = await api.delete("/monitor/clean-files");
    return response.data;
};