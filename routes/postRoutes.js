const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");

/**
 * @swagger
 * /post/create:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Crear nuevo post
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       400:
 *         description: Faltan datos de completar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos de completar
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                 nombre:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.post("/create", auth, postController.create_post);


/**
 * @swagger
 * /post/listPost:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Lista de todos los posts
 *     security:
 *       - ApiTokenAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   contenido:
 *                     type: string
 *       404:
 *         description: Aun no hay posteos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aun no hay posteos
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.get("/listPost", auth, postController.list_post);


/**
 * @swagger
 * /post/deletePost:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Eliminar post
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: ¡Post eliminado correctamente!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ¡Post eliminado correctamente!
 *       404:
 *         description: No se encontró el post. Verifica el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontró el post. Verifica el ID proporcionado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                 tipo:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.delete("/deletePost", auth, postController.delete_post);


/**
 * @swagger
 * /post/updatePost:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Actualizar post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post no encontrado
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Descripción del error
 */
router.put("/updatePost", auth , postController.update_post);



/**
 * @swagger
 * /post/onePost:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener un solo post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a obtener
 *     responses:
 *       200:
 *         description: Post obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       403:
 *         description: No se puede mostrar este post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se puede mostrar este post
 *       404:
 *         description: Post o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.get("/onePost", auth, postController.onePost);


/**
 * @swagger
 * /post/userPost:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener posts de un usuario seguido
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario seguido cuyos posts se desean obtener
 *     responses:
 *       200:
 *         description: Posts obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   contenido:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       404:
 *         description: No se pueden mostrar estos posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pueden mostrar estos posts
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.get("/userPost", auth, postController.userPost);
module.exports = router;