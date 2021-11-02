#!/bin/bash

# create docker volumes
docker volume create pg-database || true

docker volume create public-photo || true


# create network
docker network create woowoo_net || true