import { LoginDTO } from "../utils/DTOS";
import api from "./api";

export const loginUser = async (loginData: LoginDTO): Promise<LoginDTO> => {
    const response = await api.post('/login', loginData);
    return response.data;
};