#!/bin/sh

ts-node generators/generate-webhook-alert-interfaces.ts
ts-node generators/generate-api-route-interfaces.ts
ts-node generators/generate-enums.ts
yarn format
