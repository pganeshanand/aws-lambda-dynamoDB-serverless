# aws-lambda-dynamoDB-serverless
Endpoint using AWS Lambda to interact with DynamoDB in NodeJS

This AWS Lambda based REST API will save the address, suburb and postcode into AWS DynamoDB and reterive them as list and also based on the unique key

#### Test the API

##### Endpoints Details:

##### Save record into dynamoDB (Method: POST, Path: save)

Sample URL:

```sh
https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/save
```

Sample data provided in the body

```sh
{
   "address" : "12 Pitt Street",
   "suburb": "Mascot",
   "postcode": 2003
}
```

##### Fetch all the records in dynamoDB (Method: GET, Path: fetchAll)

Sample URL:

```sh
https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/fetchAll
```

##### Fetch records in dynamoDB based on unique id (Method: GET, Path: fetch/{id})

Here the id (unique id) is value provided in the path parameter,
if this id exists in dynamoDB it returns the values corresponding to this id, if not it returns blank value.

Sample URL:

```sh
https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/fetch/f5ebb473-3128-49e7-917e-bbc40f20567e
```

#### Prerequisite to run this application in the local AWS environment (if needed):

##### Install node js

Refer [Node Website](https://nodejs.org/en/)
Verify node js installation in command window using

```sh
node --version
```

##### Install serverless

Can be done either in global (or) local scope using command window,
Global scope use the below command

```sh
npm install -g serverless
```

Local(project) scope use the below command

```sh
npm install serverless
```

Verify serverless install through command window

```sh
serverless --version
```

##### Install aws-cli

Through command window

```sh
pip install aws-cli
```

###### Note

- The above installation works if python is already installed, if not please install python.
  Verify aws-cli install in command window using

```sh
aws --version
```

#### Assumptions:

This code does not create users in Amazon Cognito. It assumes users are created by some other process. For instance, users can be created manually in Admin console after creation of Userpools.

To deploy, you should
have the default aws credentials file in local machine
(or)
pass the keys through serverless commands as below,

```sh
serverless config credentials --provider aws --key <Access key ID> --secret <Secret access key>
```

(or) aws commands as below,

```sh
aws configure
AWS Access Key ID [None]: <Access key ID>
AWS Secret Access Key [None]: <Secret access key>
Default region name [None]: <Region name>
Default output format [None]:
```

###### Note

- This Access key ID should have either admin access or atleast permisson for all our resources used (AWS Lambda, AWS S3, AWS DynamoDB, AWS API Gateway)

#### Process to Deploy

Use the below command

```sh
serverless deploy -v
```

(or)

```sh
sls deploy -v
```

###### Note

- '-v' gives the more details during deployment proceess.
- On successful deployment logs in console will show the endpoints. Similar as below,

  POST - https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/save

  GET - https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/fetchAll

  GET - https://4l0lykktz2.execute-api.ap-southeast-2.amazonaws.com/dev/fetch/{id}
  

- The HTML with Javascript for the frontend layer is not created to intergate with this endpoint due to shortage of time. This can be implemented by placing the HTML files in S3 bucket and configuring the URL to access the API gateway which inturn calls the appropriate AWS lambda functions.

#### Test the API

Refer to the postman collection shared (or) the testing procedure provided earlier.

If deployed in another environment make sure for testing in postman
Go to Authorization tab - AWS Signature and provide the AWS AccessKey, AWS SecretKey, AWS Region and servicename as 'execute-api' and then try it.

#### Remove created AWS Infrastructure:

AWS infrastructure can be completely removed by using the below command in command prompt

```sh
serverless remove
```

(or)

```sh
sls remove
```
