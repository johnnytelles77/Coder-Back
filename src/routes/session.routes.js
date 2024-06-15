import { Router } from "express"
import userDao from "../dao/mongoDao/user.dao.js"
import { createHash, isValidPassword } from "../utils/hasPassword.js";
import passport from "passport";

const router = Router();

router.post("/register",passport.authenticate("register"), async (req, res) => {
    try {



      res.status(201).json({ status: "success", msg: "Usuario Creado" });
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error interno del servidor" });
        
    }
})
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verificar que el usuario sea administrador
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
          email,
          role: "admin",
        };
        return res.status(200).json({ status: "success", payload: req.session.user });
      }
  
      // En caso de que no sea administrador
      const user = await userDao.getByEmail(email);
      if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({ status: "Error", msg: "Email o password no válidos" });
      }
  
      req.session.user = {
        email,
        role: "user",
      };
  
      res.status(200).json({ status: "success", payload: req.session.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  });

  router.get("/logout", async (req, res) => {
    try {
      req.session.destroy();
  
      res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  });
  



export default router; 