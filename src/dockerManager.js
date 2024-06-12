const Docker = require('dockerode');
const docker = new Docker();

async function runCommandInContainer(imageName, command) {
    try {
        const container = await docker.createContainer({
            Image: imageName,
            Cmd: ['/bin/bash', '-c', command],
            Tty: false,
        });

        const stream = await container.attach({ stream: true, stdout: true, stderr: true });
        container.modem.demuxStream(stream, process.stdout, process.stderr);

        await container.start();
        await container.wait();
        await container.remove();

        return { success: true, message: 'Command executed successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = { runCommandInContainer };