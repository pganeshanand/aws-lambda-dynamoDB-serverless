import { APIGatewayEvent, Handler } from "aws-lambda";

import { saveAddressInDB, getAddressFromDB, getAddressesFromDB } from "./dynamodb-actions";

export const respond = (fulfillmentText: any, statusCode: number): any => {
  return {
    statusCode,
    body: JSON.stringify(fulfillmentText),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};

/** Save an address in dynamodb */
export const saveAddress: Handler = async (
  event: APIGatewayEvent) => {
  const incoming: { address: string; suburb: string; postcode: number } = JSON.parse(event.body);
  const { address, suburb, postcode } = incoming;

  try {
    await saveAddressInDB(address, suburb, postcode);

    return respond(incoming, 201);
  } catch (err) {
    return respond(err, 400);
  }
};

/** Get all addresses from the dynamoDb */
export const getAllAddress: Handler = async () => {
  try {
    const addressess = await getAddressesFromDB();

    return respond(addressess.Items, 200);
  } catch (err) {
    return respond(err, 404);
  }
};

/** Get all address based on id from the dynamoDb */
export const getAddress: Handler = async (
  event: APIGatewayEvent) => {
  const id: string = event.pathParameters.id;

  try {
    const address = await getAddressFromDB(id);

    return respond(address, 200);
  } catch (err) {
    return respond(err, 404);
  }
};
