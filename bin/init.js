const ora = require("ora");
const { exec } = require("child_process");
const rimraf = require("rimraf");

const args = process.argv.slice(2);

const init = async () => {
	const projectName = !!args.length ? args.toString() : 'react-demo';

	const gitFetchUrl = `git clone https://github.com/bmeritter/react-template && cat ./package.json`;
	const spinner = ora(
		"Start generating the project. Please waiting ..."
	).start();

	exec(gitFetchUrl, (error, stdout, stderr) => {
		if (error) {
			spinner.fail();
			console.log(error);
			process.exit();
		}

		rimraf.sync(`react-template/.git`);
		spinner.succeed(`${projectName} generator completed!`);

		process.exit();
	});

}

init();
