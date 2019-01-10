# AWS Region that the ECS Cluster is in
ECS_REGION='ap-southeast-1'
# Name of the ECR
ECR_NAME='snapshot_stg'
# URI of the ECR
ECR_URI='960936960904.dkr.ecr.ap-southeast-1.amazonaws.com'

# Build the Docker image from the Docker file.
docker build -t "${ECR_NAME}" .

# Tag the new Docker image to the remote repo, using the VERSION identifier
docker tag "${ECR_NAME}:latest" "${ECR_URI}/${ECR_NAME}:latest"

# Login to AWS ECR
source ~/.bash_profile
$(aws ecr get-login --region "${ECS_REGION}")

# Push to the remote ECR repo (latest-ENVIRONMENT identifier)
docker push "${ECR_URI}/${ECR_NAME}:latest"
