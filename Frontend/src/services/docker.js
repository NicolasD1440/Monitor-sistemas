import api from "./api";

export const getContainers = async () => {
    const response = await api.get("/monitor/hostagent/containers");
    return response.data;
};

export const restartAllContainers = async () => {
    const response = await api.post("/monitor/hostagent/containers/restart");
    return response.data;
};

export const restartContainer = async (containerName) => {
    const response = await api.post(
        `/monitor/hostagent/containers/${containerName}/restart`
    );
    return response.data;
};