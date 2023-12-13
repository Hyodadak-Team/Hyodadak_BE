const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "hyodadak-server",
            description:
                "hyodadak-server api docs",
        },
        servers: [
            {
                url: "http://localhost:4000", // 요청 URL
            },
        ],
    },
    apis: [ __dirname + "/../routes/*.js"], //Swagger 파일 연동
}
const specs = swaggerJSDoc(options)

module.exports = { swaggerUi, specs }