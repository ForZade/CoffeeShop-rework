// runTests.ts
import { exec } from 'child_process';
import glob from "glob";

async function runTests() {
    try {
        const files = await glob.sync('./tests/**/*.test.ts');

        if (files.length === 0) {
            console.log('No test files found.');
            return;
        }

        const command = `node --test --require ts-node/register ${files.join(' ')}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing tests: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }

            console.log(stdout);
        });
    } catch (err) {
        console.error('Error finding test files:', err);
    }
}

runTests();
