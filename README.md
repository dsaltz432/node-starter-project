# Node Starter Project

<hr>

## Project Summary

This project creates a node webapp. It connects to mongo and redis and supports several basic endpoints. 

<hr>

## Running Locally

1. Set up your .env file based on the format defined in `example.env`
2. Install dependencies: `yarn`<br>
3. You will also need to install and run mongo and redis locally
4. Start the application: `yarn start`<br>


## Running Through Docker

1. Download docker desktop (which also downloads the docker cli): https://hub.docker.com/editions/community/docker-ce-desktop-mac/
2. Clone this git repo and in terminal go into the root folder
3. Pull down my nodejs docker image: `docker pull dsaltz432/node-starter-project:latest`
4. Start the docker containers: `docker-compose up` (the first time this runs it will download the mongo and redis images)


## Hitting Endpoints

1. Get the current list of phrases: `curl http://localhost:8080/v1/saladbowl/games/abc/phrases`<br>
2. Create a new phrase: `curl -d '{"text": "hey there!"}' http://localhost:8080/v1/saladbowl/games/abc/phrases`
3. Run the "GET" request from step 1 to see the new phrase returned


Note: This project is configured to persist mongo data between runs, but not to persist redis data.
