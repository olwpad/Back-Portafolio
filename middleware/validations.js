import jwt from 'jsonwebtoken';
export function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener token del encabezado Authorization
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
      // Si el token es válido, guarda la información decodificada en req
      req.usuarioId = decoded.usuarioId;
      next();
    });
  }

