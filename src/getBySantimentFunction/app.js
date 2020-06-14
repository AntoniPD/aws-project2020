"use strict";

const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event, context) => {
  const params = {
    TableName: process.env.DDBtable,
    FilterExpression: "#sentiment = :sentiment",
    ExpressionAttributeNames: {
      "#sentiment": "Sentiment",
    },
    ExpressionAttributeValues: {
      ":sentiment": event.pathParameters.sentiment,
    },
  };
  const result = await client.scan(params).promise();
  console.log(result);
  if (!result.Items) {
    return {
      isBase64Encoded: true,
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      message: "Not found",
    };
  }

  // Return the retrieved item
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.Items),
  };
};
