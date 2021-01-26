const ora = require("ora");
const { exec } = require("child_process");
const rimraf = require("rimraf");
const fs = require('fs');

const args = process.argv.slice(2);

const replacePackageName = (stdout, str) => {
	return stdout.replace(/("name"\s*:)\s*(".*"),.*/gim, `$1"${str}",`);
}

const init = async () => {
	const projectName = !!args.length ? args.toString() : 'react-demo';

	const gitFetchUrl = `git clone https://github.com/bmeritter/react-template ${projectName} && cat ${projectName}/package.json`;
	const spinner = ora(
		"Start generating the project. Please waiting ..."
	).start();

	exec(gitFetchUrl, (error, stdout, stderr) => {
		if (error) {
			spinner.fail();
			console.log(error);
			process.exit();
		}

		let packageContent = '';
		packageContent = replacePackageName(stdout, projectName);

		fs.writeFileSync(`${projectName}/package.json`, packageContent);

		rimraf.sync(`${projectName}/.git`);
		spinner.succeed(`${projectName} generator completed!`);

		process.exit();
	});

}

module.exports = init;
