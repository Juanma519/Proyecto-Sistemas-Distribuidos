"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./rutas/index"));
const schema_1 = require("./graphql/schema");
const express_graphql_1 = require("express-graphql"); // ES6
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.json());
app.use(index_1.default);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.esquema,
    rootValue: schema_1.resolvers,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});
//para ejecutar docker : docker-compose up --build
