import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Untuk Managemen Buku",
      version: "1.0.0",
      description: "API for managing books with authentication",
    },
    servers: [
      {
        url: "http://localhost:3500",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
