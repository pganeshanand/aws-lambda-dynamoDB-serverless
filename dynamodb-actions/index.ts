import * as AWS from "aws-sdk";
import * as uuid from "uuid/v4";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "addressList";

/** save address in dynamodb */
export async function saveAddressInDB(address: string, suburb: string, postcode: number) {
  const params = {
    TableName: tableName,
    Item: {
      id: uuid(),
      address,
      suburb,
      postcode
    }
  };

  return dynamoDB
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}

/** get address from dynamodb */
export async function getAddressFromDB(id: string) {
  const params = {
    TableName: tableName,
    Key: {
      id
    }
  };

  return dynamoDB
    .get(params)
    .promise()
    .then(res => res.Item)
    .catch(err => err);
}


/** get all address from dynamodb */
export async function getAddressesFromDB() {
  const params = {
    TableName: tableName,
    Select: "ALL_ATTRIBUTES"
  };

  return dynamoDB
    .scan(params)
    .promise()
    .catch(err => err);
}
