// run-tests.ts
import  { glob } from 'glob';
import { execSync } from 'child_process';

const testFiles = glob.sync('./tests/*.test.ts');

testFiles.forEach((file) => {
    execSync(`node --require ts-node/register ${file}`, { stdio: 'inherit' });
});
