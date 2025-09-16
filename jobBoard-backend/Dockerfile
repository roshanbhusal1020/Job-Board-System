FROM maven:3.9.2-eclipse-temurin-17

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

CMD ["java", "-jar", "target/jobBoard-backend-0.0.1-SNAPSHOT.jar"]
