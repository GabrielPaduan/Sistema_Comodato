import { LoginDTO, LoginResponse, UserInsertDTO } from "../utils/DTOS";
import api from "./api";

export const loginUser = async (loginData: LoginDTO): Promise<LoginResponse> => {
    const response = await api.post('/cadastro/login', loginData);
    return response.data;
};

export const cadastrarUser = async (cadastroData: UserInsertDTO): Promise<UserInsertDTO> => {
    const response = await api.post('/cadastro', cadastroData);
    return response.data;
};