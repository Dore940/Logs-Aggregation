const AWS = require('aws-sdk');

function initializeCloudWatchLogs(accessKeyId, secretAccessKey, region) {
    return new AWS.CloudWatchLogs({
        accessKeyId,
        secretAccessKey,
        region
    });
}

async function createLogGroup(cloudWatchLogs, logGroupName) {
    try {
        await cloudWatchLogs.createLogGroup({ logGroupName }).promise();
    } catch (error) {
        if (error.code !== 'ResourceAlreadyExistsException') {
            throw error;
        }
    }
}

async function createLogStream(cloudWatchLogs, logGroupName, logStreamName) {
    try {
        await cloudWatchLogs.createLogStream({ logGroupName, logStreamName }).promise();
    } catch (error) {
        if (error.code !== 'ResourceAlreadyExistsException') {
            throw error;
        }
    }
}

async function sendLogsToCloudWatch(cloudWatchLogs, logGroupName, logStreamName, logs) {
    const params = {
        logEvents: logs.map((log, index) => ({
            message: log,
            timestamp: Date.now() + index // Ensuring unique timestamps
        })),
        logGroupName,
        logStreamName
    };

    await cloudWatchLogs.putLogEvents(params).promise();
}

module.exports = { initializeCloudWatchLogs, createLogGroup, createLogStream, sendLogsToCloudWatch };