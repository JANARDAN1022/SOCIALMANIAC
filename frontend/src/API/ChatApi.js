import { makeRequest } from "../axios";

export const userChats = (id)=>makeRequest.get(`/chat/${id}`);

export const getUser = (id)=>makeRequest.get(`/users/${id}`);

export const getMessages = (id)=>makeRequest.get(`/messages/${id}`);

export const addMessages = (data)=>makeRequest.post('/messages/',data);