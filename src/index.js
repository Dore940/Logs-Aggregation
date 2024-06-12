const yargs = require('yargs');
require('dotenv').config();
const { runCommandInContainer } = require('./dockerManager');
const { initializeCloudWatchLogs, createLogGroup, createLogStream, sendLogsToCloudWatch } = require('./cloudWatchLogger');
const { log, error } = require('./logger');

const argv = yargs
    .option('image', {
        alias: 'i',
        description: 'Docker image name',
        type: 'string',
        default: process.env.DOCKER_IMAGE
    })
    .option('command', {
        alias: 'c',
        description: 'Bash command to run inside the Docker container',
        type: 'string',
        default: process.env.BASH_COMMAND
    })
    .option('logGroup', {
        alias: 'lg',
        description: 'AWS CloudWatch Log Group name',
        type: 'string',
        default: process.env.LOG_GROUP
    })
    .option('logStream', {
        alias: 'ls',
        description: 'AWS CloudWatch Log Stream name',
        type: 'string',
        default: process.env.LOG_STREAM
    })
    .option('accessKeyId', {
        alias: 'akid',
        description: 'AWS Access Key ID',
        type: 'string',
        default: process.env.AWS_ACCESS_KEY_ID
    })
    .option('secretAccessKey', {
        alias: 'sak',
        description: 'AWS Secret Access Key',
        type: 'string',
        default: process.env.AWS_SECRET_ACCESS_KEY
    })
    .option('region', {
        alias: 'r',
        description: 'AWS Region',
        type: 'string',
        default: process.env.AWS_REGION
    })
    .help()
    .alias('help', 'h')
    .argv;

(async() => {
    try {
        const { image, command, logGroup, logStream, accessKeyId, secretAccessKey, region } = argv;

        log('Starting Docker container...');
        const result = await runCommandInContainer(image, command);

        if (result.success) {
            log('Docker command executed successfully.');

            log('Initializing CloudWatch Logs...');
            const cloudWatchLogs = initializeCloudWatchLogs(accessKeyId, secretAccessKey, region);

            log(`Creating Log Group: ${logGroup}`);
            await createLogGroup(cloudWatchLogs, logGroup);

            log(`Creating Log Stream: ${logStream}`);
            await createLogStream(cloudWatchLogs, logGroup, logStream);

            log('Sending logs to CloudWatch...');
            await sendLogsToCloudWatch(cloudWatchLogs, logGroup, logStream, ['Command executed successfully']);

            log('Logs sent to CloudWatch successfully.');
        } else {
            error('Error executing Docker command:', result.message);
        }
    } catch (err) {
        error('An error occurred:', err.message);
    }
})();