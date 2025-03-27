/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - time
 *         - description
 *         - location
 *       properties:
 *         time:
 *           type: string
 *           example: "09:00"
 *         description:
 *           type: string
 *           example: "Visit Eiffel Tower"
 *         location:
 *           type: string
 *           example: "Champ de Mars"
 *     ItineraryInput:
 *       type: object
 *       required:
 *         - title
 *         - destination
 *         - startDate
 *         - endDate
 *         - activities
 *       properties:
 *         title:
 *           type: string
 *           example: "Weekend in Paris"
 *         destination:
 *           type: string
 *           example: "Paris"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-04-01"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-04-03"
 *         activities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Activity'
 *     ItineraryResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ItineraryInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *             userId:
 *               type: string
 *               example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *             shareableId:
 *               type: string
 *               example: 66298e5ed7c73ccb950a5575194c8cfa
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *     ItineraryListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             itineraries:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItineraryResponse'
 *             totalPages:
 *               type: integer
 *               example: 3
 *             currentPage:
 *               type: integer
 *               example: 1
 *             totalItems:
 *               type: integer
 *               example: 24
 *     ShareResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Shareable link generated successfully
 *         data:
 *           type: object
 *           properties:
 *             shareableLink:
 *               type: string
 *               example: http://localhost:3001/api/itineraries/share/66298e5ed7c73ccb950a5575194c8cfa
 */

module.exports = {};
