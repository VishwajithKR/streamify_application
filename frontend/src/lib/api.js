import { axiosInstance } from "./axios";

export const signup = async (data) => {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
};

export const login = async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
};

export const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.error("Error in getAuthUser:", error.message);
        return null;
    }
};

export const completeOnboarding = async (data) => {
    const res = await axiosInstance.post("/auth/onboarding", data);
    return res.data;
};

export const getRecommendedUsers = async () => {
    const res = await axiosInstance.get("/users");
    return res.data;
};

export const getUserFriends = async () => {
    const res = await axiosInstance.get("/users/friends");
    return res.data;
};

export const getOutgoingFriendReqs = async () => {
    const res = await axiosInstance.get("/users/outgoing-friend-requests");
    return res.data;
};

export const sendFriendRequest = async (dataId) => {
    const res = await axiosInstance.post(`/users/friend-request/${dataId}`);
    return res.data;
};

export const getFriendRequest = async () => {
    const res = await axiosInstance.get("/users/friend-request");
    return res.data;
};

export const acceptFriendRequest = async (dataId) => {
    const res = await axiosInstance.post(`/users/friend-request/${dataId}/accept`);
    return res.data;
}