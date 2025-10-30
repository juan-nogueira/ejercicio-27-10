// middlewares/adminAuth.js
export const adminAuth = (req, res, next) => {
  const user = req.headers["x-admin-user"];
  const pass = req.headers["x-admin-pass"];

  // Usuario y contraseña por defecto
  const DEFAULT_USER = "admin";
  const DEFAULT_PASS = "1234";

  if (user === DEFAULT_USER && pass === DEFAULT_PASS) {
    next(); // continúa con el siguiente middleware o controlador
  } else {
    res.status(401).json({ message: "Acceso no autorizado" });
  }
};