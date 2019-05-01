"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("./app/config");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swagger_1 = require("./shared/swagger");
const expressSession = require("express-session");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        swagger_1.swagger(app);
        app.use(compression());
        app.use(helmet());
        app.use(rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 250,
        }));
        app.use(expressSession({
            secret: config_1.default.JWT_SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: config_1.default.SESSION_EXPIRES_IN,
            },
        }));
        yield app.listen(config_1.default.APP_PORT);
        common_1.Logger.log(`Server running on ${config_1.default.APP_DOMAIN}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map