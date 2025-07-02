import { axiosInstance } from "./axios";

export const signup = async (data) => {
    const res = await axiosInstance.post("auth/signup", data);
    return res.data;
};

export const login = async (data) => {
    const res = await axiosInstance.post("auth/login", data);
    return res.data;
};

export const logout = async () => {
    const res = await axiosInstance.post("auth/logout");
    return res.data;
};

export const getAuthUser = async () => {
    const res = await axiosInstance.get("auth/me");
    return res.data;
};

export const completeOnboarding = async (data) => {
    const res = await axiosInstance.post("auth/onboarding", data);
    return res.data;
};