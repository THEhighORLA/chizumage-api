const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");



const {
  getItems,
  getItem
} = require("../controllers/cOperationStatus");

/**
 * Get all cUser
 * @openapi
 * /cUser:
 *    get:
 *      tags:
 *        - cUser
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getItems);
/**
 * Get track
 * @openapi
 * /cUser/{id}:
 *    get:
 *      tags:
 *        - cUser
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", getItem);
/**
 * Register new track
 * @openapi
 * /cUser:
 *    post:
 *      tags:
 *        - cUser
 *      summary: "Register track"
 *      description: Registra una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
module.exports = router;