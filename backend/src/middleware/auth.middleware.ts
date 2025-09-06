import express, { type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

declare global {
  namespace Express {
    interface Request {
      user?: { sub: string; role: string }; // Use a estrutura do seu payload aqui
    }
  }
}

export const verifyToken = (req: express.Request, res: express.Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = userPayload as { sub: string; role: string }; // Adiciona o payload decodificado à requisição
    next(); // Se o token for válido, continua para a rota
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};