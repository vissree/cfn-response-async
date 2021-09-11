# README

This package is an async version of [cfn-response module](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html#w2ab1c27c23c16b9c15).

The module includes a send method, which sends a [Custom resource response object](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref-responses.html) corresponding to the received [request object](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref-requests.html) and returns a promise so that it can be used within [Async nodejs handlers](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async).

## Sample usage

```
const response = require("cfn-response-async");

async function someAsyncLogicToRun() {
    return "All good!";
}

exports.handler = async (event, context) => {
    console.log(event);
    console.log(context);

    var res;

    try {
        const outputValue = await someAsyncLogicToRun();
        const responseData = {
            Value: outputValue,
        };

        res = await response.send(
            event,
            context,
            response.SUCCESS,
            responseData
        );
    } catch (error) {
        console.log(error);
        res = await response.send(event, context, response.FAILED);
    }

    console.log("Status code: " + res.statusCode);
    console.log("Status message: " + res.statusMessagee);
    return res.statusCode;
};

```
