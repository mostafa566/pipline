# 🚀 CI/CD Pipeline for Frontend Application Using Jenkins, Docker & AWS
This project demonstrates a complete CI/CD pipeline built using Jenkins, Docker, and AWS EC2.
The pipeline automates the process of building, containerizing, and deploying a frontend web application.

## 📌 Project Overview
The goal of this project is to automate the deployment of a frontend application using a fully functional CI/CD pipeline.
The workflow includes:

### Creating two EC2 instances on AWS

Jenkins Server

WebApp Server

✅ Installing and configuring Jenkins on the first EC2 instance

✅ Hosting the frontend project on GitHub

✅ Jenkins pipeline automatically pulls the latest code

✅ Docker builds an image using the provided Dockerfile

✅ The image is pushed to Docker Hub

✅ The WebApp EC2 instance pulls the image and runs it as a container

This ensures continuous integration and continuous delivery with zero manual intervention after code push.

### 🏗️ Architecture Diagram (Conceptual)
Code
Developer → GitHub → Jenkins EC2 → Docker Hub → WebApp EC2 → Running Container
⚙️ Technologies Used
Component	Technology
CI/CD Tool	Jenkins
Cloud Provider	AWS EC2
Containerization	Docker
Image Registry	Docker Hub
Web Server	NGINX (inside Docker container)
Source Control	Git & GitHub
✅ Pipeline Workflow
1. Developer pushes code to GitHub
The pipeline is triggered manually or automatically (if webhook configured).

2. Jenkins Pipeline Stages
The Jenkinsfile performs the following:

Git Checkout – Pulls the latest code from GitHub

Docker Build – Builds a Docker image using the project’s Dockerfile

Docker Push – Pushes the image to Docker Hub

Remote Deployment – Connects to WebApp EC2 and runs the container

### 🧩 Jenkins Pipeline Script (Jenkinsfile)
groovy
node {
    stage('Git checkout'){
        git branch: 'main', url: 'https://github.com/mostafa566/pipline.git'
    }
    
    stage('make an image of project'){
       sh 'docker image build -t quickbite-httpd:latest -f quickbite/DockerFile quickbite/'
    }

    stage('push image to my registery'){
        withCredentials([string(credentialsId: 'last', variable: 'lasthubname')]) {
            sh 'docker tag quickbite-httpd:latest mostafahossam11/myhub:latest'
            sh 'docker login -u mostafahossam11 -p $lasthubname'
            sh 'docker image push mostafahossam11/myhub:latest'
        }
    }

    stage('dockerized image on webapp EC2'){
        sshagent(['sshconnect']) {
            sh 'ssh -o StrictHostKeyChecking=no ubuntu@3.238.152.172 docker run -d --name weebbssiittee -p 9009:80 mostafahossam11/myhub:latest'
        }
    }
}
### 📦 Dockerfile
dockerfile
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
This Dockerfile uses NGINX to serve the frontend application.

### 🌐 Deployment Result
After the pipeline completes:

The WebApp EC2 instance runs the latest Docker container

The frontend application becomes accessible on:

Code
http://<WebApp-EC2-Public-IP>:9009
### 🏁 Conclusion
This project showcases a fully automated CI/CD pipeline using:

Jenkins for automation

Docker for containerization

AWS EC2 for hosting

Docker Hub for image distribution

It provides a clean, scalable, and production‑ready workflow for deploying frontend applications.
