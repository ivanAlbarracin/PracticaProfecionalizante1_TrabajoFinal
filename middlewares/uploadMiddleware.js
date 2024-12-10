const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento con multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/avatars'); // Carpeta donde se guardarán las imágenes
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtrar archivos para asegurarnos de que solo se suban imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato JPEG, JPG o PNG'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 } // Límite de 2MB por imagen
});

module.exports = upload;