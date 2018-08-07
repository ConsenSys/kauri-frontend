# Delete app if not exists
if [ "${TARGET_ENV}" == "" ] || [ "${REGISTRY_URL}" == "" ]; then
  echo "Environment not set, please run env_setup script in ops folder"
  exit 1
fi

if [[ "$1" =~ [0-9]\.[0-9]\.[0-9] ]]; then
  TAG=$1
  echo "Deploying tag: ${TAG}"
else
  echo "Please supply tag"
  exit 1
fi

TIMESTAMP=$(date)
echo ${TIMESTAMP}
BUILD_TAG=${REGISTRY_URL}/${GOOGLE_PROJECT_ID}
DOCKER_PUSH_COMMAND='gcloud docker -- push'
DOCKER_PULL_COMMAND='gcloud docker -- pull'


if [ "${TARGET_ENV}" == "uat" ]; then
  DOCKERFILE=Dockerfile-rinkeby
  DOCKER_PULL_COMMAND="${DOCKER_PULL_COMMAND} ${BUILD_TAG}/kauri-contract-abis:latest-uat"
else
  DOCKERFILE=Dockerfile
  DOCKER_PULL_COMMAND="${DOCKER_PULL_COMMAND} ${BUILD_TAG}/kauri-contract-abis:latest-dev"
fi

${DOCKER_PULL_COMMAND}
# kubectl delete -f frontend-service.yml || true

# Build docker image
cd ..
BUILD_TAG_VERSION="${BUILD_TAG}/flow-frontend:${TAG}"
BUILD_TAG_LATEST="${BUILD_TAG}/flow-frontend:latest-${TARGET_ENV}"
docker build -t $BUILD_TAG_VERSION -f $DOCKERFILE .
docker build -t $BUILD_TAG_LATEST -f $DOCKERFILE .

cd scripts
# Push docker image to registry
${DOCKER_PUSH_COMMAND} $BUILD_TAG_VERSION
${DOCKER_PUSH_COMMAND} $BUILD_TAG_LATEST
# Create app if not exists
#kubectl apply -f frontend-service.yml || true
#kubectl delete -f frontend-deployment-${TARGET_ENV}.yml || true
sed -e "s/TAG/${TAG}/g" frontend-deployment-${TARGET_ENV}.yml | sed -e "s/REGISTRY/${REGISTRY_URL}\/${GOOGLE_PROJECT_ID}/g" | sed -e "s/DATE/${TIMESTAMP}/g" > deployment.yml
kubectl apply -f deployment.yml || true
rm deployment.yml
# kubectl set image deployment frontend frontend=$BUILD_TAG
