import dynamoDbLib from "./libs/dynamoDb-lib";
import validateOrigins from "./libs/validate-origin";

export const main = async (event, context) => {
    const origin = event.headers.Origin || event.headers.origin;
    if (!validateOrigins(origin)) return;
    let viewCount = 1;
    let params = {
        TableName: process.env.TableName,
        Key: {
            slugId: event.pathParameters.slugId
        }
    };
    try {
        let result = await dynamoDbLib.get(params);
        if (!result.Item) {
            delete params.Key;
            params = {
                ...params,
                Item: {
                    slugId: event.pathParameters.slugId,
                    viewCount: 1,
                    createdAt: Date.now()
                }
            };
            await dynamoDbLib.put(params);
        } else {
            params = {
                ...params,
                ExpressionAttributeNames: {
                    "#viewCount": "viewCount",
                },
                ExpressionAttributeValues: {
                    ":viewCount": result.Item.viewCount + 1
                },
                UpdateExpression: 'SET #viewCount = :viewCount',
                ReturnValues: 'ALL_NEW'
            };
            result = await dynamoDbLib.update(params);
            viewCount = result.Attributes.viewCount;
        }
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": origin
            },
            body: JSON.stringify(viewCount)
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 400,
            body: error.message || JSON.stringify(error.message)
        };
    }
};