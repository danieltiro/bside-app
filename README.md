# bsideApp

## Dev

1. Clonar el proyecto
2. Ejecutar ```npm install```
3. Ejecutar la app ```npm start``` o bien ```ng serve -o```

# Autenticar en AWS
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 381491984567.dkr.ecr.us-east-1.amazonaws.com
# Compilar app angular
ng build --configuration "production" --base-href /app/
# Compilar imagen en docker
docker build -t bside-app -f ./Dockerfile .
# Tagear imagen en AWS
docker tag bside-app 381491984567.dkr.ecr.us-east-1.amazonaws.com/bside-app:21
# Push imagen en AWS
docker push 381491984567.dkr.ecr.us-east-1.amazonaws.com/bside-app:21