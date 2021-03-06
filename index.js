exports.SUCCESS = "SUCCESS";
exports.FAILED = "FAILED";

exports.send = async function (
  event,
  context,
  responseStatus,
  responseData,
  physicalResourceId,
  noEcho
) {
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason:
      "See the details in CloudWatch Log Stream: " + context.logStreamName,
    PhysicalResourceId: physicalResourceId || context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    NoEcho: noEcho || false,
    Data: responseData,
  });

  console.log("Response body:\n", responseBody);

  const https = require("https");
  const url = require("url");

  const parsedUrl = url.parse(event.ResponseURL);
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "content-type": "",
      "content-length": responseBody.length,
    },
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, function (res) {
      resolve(res);
    });
    request.on("error", function (err) {
      reject(err);
    });
    request.write(responseBody);
    request.end();
  });
};
