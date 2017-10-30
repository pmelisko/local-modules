const fs = require('fs');
const path = require('path');

console.log('Creating symlink to local modules');

const localModulePaths = ["@local_module"];
const base = "./";

localModulePaths.forEach((modulePath) => {
	// check if already installed (symlink already created)
	if (fs.existsSync(`node_modules/@local_module`)) {
		console.log(`Module ${modulePath} already exists`)
	} else {
		let source = path.resolve(base, modulePath);
		if (!fs.existsSync(source)) {
			console.error(`${source} doesnt exist`);
			process.exit(1); // error!
		} else {
			const linkPath = `node_modules/${modulePath}`;
			// ensure, node_modules folder will exists, if no dependencies, node_modules will not be created
			if (!fs.existsSync('node_modules')){
    			fs.mkdirSync('node_modules');
			}

			fs.symlinkSync(source, linkPath, 'junction');
			console.log(`Module ${modulePath} created`);
		}
	}
});