"use strict";

const { processRecord } = require("./processRecord");

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  try {
    await Promise.all(
      event.Records.map(async (record) => processRecord(record))
    );
  } catch (err) {
    console.error(err);
  }
};
