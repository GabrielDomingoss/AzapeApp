import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SHA256 from '@pozible/meteor-sha';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionsController {
  async store(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      const user = await User.findOne(
        { "emails.address": email.toLowerCase() },
        {
          'emails.address': 1,
          'services.password': 1,
          'profile.name': 1
        }
      ).lean();

      if (!user) {
        return res.status(401).json({
          error: true,
          message: 'Credenciais invalidas.'
        });
      }

      if (!user.services || !user.services.password) {
        return res.status(500).json({ error: "Erro no servidor: Senha não encontrada." });
      }

      const newPassword = SHA256(password);
      const isPasswordValid = await bcrypt.compare(newPassword, user.services.password);

      if (!isPasswordValid) {
        
        console.log("❌ Senha incorreta!");
        return res.status(401).json({
          error: true,
          message: 'Credenciais invalidas' // Ajustei a mensagem por questoes de segurança
        });
      }

      const token = jwt.sign({
        id: user._id,
        role: user.role
      }, 
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
        algorithm: 'HS256'
      })

      user.services = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      return res.status(200).json({
        id: user._id,
        email: user.emails[0].address,
        name: user.profile?.name || 'Jon Doe',
        token,
        expiresIn: authConfig.expiresIn
      });

    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Ops! Ocorreu um erro em nosso servidor. Por favor, tente novamente ou contate o suporte.'
      });
    }
  }
}

export default new SessionsController();