FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV MONGO_URI=mongodb+srv://hari24prasath2005_db_user:d2Mrld2PoUoIyRuk@cluster0.ssqp7xp.mongodb.net/taskflow
ENV MONGO_DATABASE=taskflow
ENV CORS_ORIGINS=*

ENTRYPOINT ["java", "-jar", "app.jar"]