/**
 * @swagger
 * tags:
 *   name: Itineraries
 *   description: Itinerary management endpoints
 */

/**
 * @swagger
 * /api/itineraries/share/{shareableId}:
 *   get:
 *     tags: [Itineraries]
 *     summary: Get a shared itinerary
 *     parameters:
 *       - in: path
 *         name: shareableId
 *         required: true
 *         schema:
 *           type: string
 *         example: 66298e5ed7c73ccb950a5575194c8cfa
 *     responses:
 *       200:
 *         description: Public itinerary details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Shared itinerary retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/ItineraryResponse'
 *       404:
 *         description: Shared itinerary not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/itineraries/{id}/share:
 *   post:
 *     tags: [Itineraries]
 *     summary: Generate a shareable link for an itinerary
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *     responses:
 *       200:
 *         description: Shareable link generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShareResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Itinerary not found
 */

/**
 * @swagger
 * /api/itineraries:
 *   post:
 *     tags: [Itineraries]
 *     summary: Create a new itinerary
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItineraryInput'
 *     responses:
 *       201:
 *         description: Itinerary created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ItineraryResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/itineraries:
 *   get:
 *     tags: [Itineraries]
 *     summary: Get all itineraries for the authenticated user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         description: Filter by destination (case-insensitive)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [startDate, endDate, createdAt]
 *         description: Sort field
 *     responses:
 *       200:
 *         description: List of itineraries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItineraryListResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/itineraries/{id}:
 *   get:
 *     tags: [Itineraries]
 *     summary: Get an itinerary by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *     responses:
 *       200:
 *         description: Itinerary details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ItineraryResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Itinerary not found
 *   put:
 *     tags: [Itineraries]
 *     summary: Update an itinerary
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItineraryInput'
 *     responses:
 *       200:
 *         description: Itinerary updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ItineraryResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Itinerary not found
 *   delete:
 *     tags: [Itineraries]
 *     summary: Delete an itinerary
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 5f7d0a1b2c3d4e5f6a7b8c9d
 *     responses:
 *       204:
 *         description: Itinerary deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Itinerary not found
 */

module.exports = {};
