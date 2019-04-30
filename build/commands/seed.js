"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
glob('src/**/*.seed.ts', (err, files) => {
    if (err) {
        console.error(err.message);
    }
    for (const seedFile of files) {
        let file = '../' + seedFile;
        const object = require(file);
        object.Seed();
    }
});
//# sourceMappingURL=seed.js.map