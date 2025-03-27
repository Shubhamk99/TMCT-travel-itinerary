/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: mypassword123
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *         email:
 *           type: string
 *           example: user@example.com
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             user:
 *               $ref: '#/components/schemas/UserResponse'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: Error message here
 */

module.exports = {};
