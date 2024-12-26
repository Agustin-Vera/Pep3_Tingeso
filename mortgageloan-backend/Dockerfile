FROM openjdk:17
ARG JAR_FILE=target/mortgageloan-backend.jar
COPY ${JAR_FILE} mortgageloan-backend.jar
ENTRYPOINT ["java","-jar","/mortgageloan-backend.jar"]