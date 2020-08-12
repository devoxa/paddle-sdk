#!/bin/sh

echo "Generating webhook alert types"
ts-node generators/generate-webhook-alerts.ts

echo "Generating API route types"
ts-node generators/generate-api-routes.ts

echo "Generating enum types"
ts-node generators/generate-enums.ts

echo "Formatting the generated code"
yarn format
