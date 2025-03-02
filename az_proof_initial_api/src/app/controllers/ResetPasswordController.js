import User from "../models/User";
import bcrypt from "bcrypt";
import SHA256 from "@pozible/meteor-sha"; 

class ResetPasswordController {
    async resetPassword(req, res) {
        try {
            const { email, newPassword } = req.body;

            if (!email || !newPassword) {
                return res.status(400).json({ error: "Usuário e nova senha são obrigatórios." });
            }

            const user = await User.findOne({ "emails.address": email });

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            if (!user.services) {
                user.services = {};
            }

            const hashedSha256 = SHA256(newPassword);
            const hashedPassword = await bcrypt.hash(hashedSha256, 10);

            await User.updateOne(
                { _id: user._id },
                { $set: { "services.password": hashedPassword } }
            );

            const updatedUser = await User.findOne({ _id: user._id });

            if (!updatedUser.services || !updatedUser.services.password) {
                console.log("❌ Erro ao salvar senha!");
                return res.status(500).json({ error: "Erro ao atualizar senha no banco." });
            }

            return res.json({ message: "Senha redefinida com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

export default new ResetPasswordController();
