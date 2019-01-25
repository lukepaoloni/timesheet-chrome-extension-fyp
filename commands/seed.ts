import * as glob from 'glob';

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