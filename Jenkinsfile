pipeline {
    agent any
    stages {
        stage("Checkout Repository") {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Agustin-Vera/Pep1_Tingeso.git']])
            }
        }

        stage("Build Backend") {
            steps {
                dir("mortgageloan-backend") {
                    bat "mvn clean install"
                }
            }
        }

        stage("Test Backend") {
            steps {
                dir("mortgageloan-backend") {
                    bat "mvn test"
                }
            }
        }

        stage("Build and Push Docker Backend Image") {
            steps {
                dir("mortgageloan-backend") {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                            bat "docker build -t agustinvera/mortgageloan-backend:latest ."
                            bat "docker push agustinvera/mortgageloan-backend:latest"
                        }
                    }
                }
            }
        }

        stage("Build Frontend") {
            steps {
                dir("mortgageloan-frontend") {
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        stage("Build and Push Docker Frontend Image") {
            steps {
                dir("mortgageloan-frontend") {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                            bat "docker build -t agustinvera/mortgageloan-frontend:latest ."
                            bat "docker push agustinvera/mortgageloan-frontend:latest"
                        }
                    }
                }
            }
        }
    }
}
