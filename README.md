docker-cloudwatch-logger/
│
├── src/
│   ├── dockerManager.js
│   ├── cloudWatchLogger.js
│   ├── index.js
│   ├── logger.js
│
├── .env                 // Environment variables file
├── .gitignore           // Ignore environment variables file
├── package.json
└── README.md

### Purpose

- The purpose of the program is to create a Docker container with a specified image and run a given bash command inside it, while sending the output logs to an AWS CloudWatch group and stream, creating them if they don't exist.
- This project demonstrates skills in containerization (Docker), cloud monitoring (AWS CloudWatch), and integration of different technologies and services, which are valuable skills for a software engineer working with modern cloud-based applications and infrastructure.
- This type of project can be considered a "DevOps" project, as it involves automating the deployment, monitoring, and management of an application or service using containerization and cloud technologies


### Bash command
The command performs the following tasks:

- Creates a Docker container using the Node Docker image.
- Runs a bash command inside the container that This bash command installs the required Node.js packages using npm install, and then runs a Node.js script using node -e that prints the current date and time every 100 milliseconds using setInterval.
- Sends the output logs of the container to an AWS CloudWatch group and stream.
- Accepts AWS credentials (access key ID, secret access key, and region) as arguments.


``` bash 
node src/index.js --docker-image node --bash-command $'npm install && node -e "setInterval(() => { console.log(new Date().toISOString()); }, 100);"' --aws-cloudwatch-group test-task-group-1 --aws-cloudwatch-stream test-task-stream-1 --aws-access-key-id ... --aws-secret-access-key ... --aws-region ...

```

### Dependencies

- Docker
- AWS CloudWatch
- AWS SDK for Node.js
- dotenv
- tqdm

### Environment variables

- AWS_ACCESS_KEY_ID: AWS access key ID
- AWS_SECRET_ACCESS_KEY: AWS secret access key
- AWS_REGION: AWS region
- CLOUDWATCH_GROUP: AWS CloudWatch group name
- CLOUDWATCH_STREAM: AWS CloudWatch stream name

### Run the app 
`` bash 
node src/index.js
``` 

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.