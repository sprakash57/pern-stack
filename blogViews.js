import dynamoDbLib from "./libs/dynamoDb-lib";

export const main = async (event, context) => {
    let viewCount = 1;
    let params = {
        TableName: process.env.TableName,
        Key: {
            slugId: event.pathParameters.slugId
        }
    };
    try {
        let result = await dynamoDbLib.get(params);
        console.log('get', result);
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
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(viewCount)
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 400,
            body: error.message || JSON.stringify(error.message)
        };
    }
};