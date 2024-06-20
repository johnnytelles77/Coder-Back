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
router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
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