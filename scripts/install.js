const fs = require('fs');
const path = require('path');

console.log('Creating symlink to local modules');

const localModulePaths = [
	"my_module/test",
	"my_module/test2"
];
const base = "./";

localModulePaths.forEach((modulePath) => {
	var moduleName = path.basename(modulePath);
	// check if already installed (symlink already created)
	if (fs.existsSync(`node_modules/${moduleName}`)) {
		console.log(`Module ${moduleName} already exists`)
	} else {
		let source = path.resolve(base, modulePath);
		if (!fs.existsSync(source)) {
			console.error(`${source} doesnt exist`);
			process.exit(1); // error!
		} else {
			const linkPath = `node_modules/${moduleName}`;
			// ensure, node_modules folder will exists, if no dependencies, node_modules will not be created
			if (!fs.existsSync('node_modules')){
				fs.mkdirSync('node_modules');
			}

			fs.symlinkSync(source, linkPath, 'junction');
			console.log(`Module ${moduleName} created`);
		}
	}
});