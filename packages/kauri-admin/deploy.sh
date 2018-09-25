# Delete app if not exists
if [ "${TARGET_ENV}" == "" ] || [ "${REGISTRY_URL}" == "" ]; then
  echo "Environment not set, please run env_setup script in ops folder"
  exit 1
fi

if [ "${CLOUD_ENV}" == "azure" ]; then
  BUILD_TAG=${TARGET_ENV}${REGISTRY_URL}
  DOCKER_PUSH_COMMAND='docker push'
  DOCKER_PULL_COMMAND='docker pull'
else
  BUILD_TAG=${REGISTRY_URL}/${GOOGLE_PROJECT_ID}
  DOCKER_PUSH_COMMAND='gcloud docker -- push'
  DOCKER_PULL_COMMAND='gcloud docker -- pull'
fi

DOCKERFILE=Dockerfile

# kubectl delete -f frontend-service.yml || true

# Build docker image

BUILD_TAG="${BUILD_TAG}/kauri-admin:latest"
docker build -t $BUILD_TAG -f $DOCKERFILE .

cd k8s
# Push docker image to registry
${DOCKER_PUSH_COMMAND} $BUILD_TAG
# Create app if not exists
kubectl apply -f kauri-admin-service.yml || true
kubectl delete -f kauri-admin-deployment.yml || true
kubectl apply -f kauri-admin-deployment.yml  || true
