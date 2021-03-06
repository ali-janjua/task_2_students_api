### RESTful API endpoints to manage university students.

#### Before using
Please make sure that you have:
- Node.js installed (https://nodejs.org/)
- MongoDB (https://docs.mongodb.com)
- Run npm install in your root project folder


#### Usage
To run the project, please use a command line the following:
* `npm start`
    * It will run the server at port 3000. For example https://localhost:3000
    * API endpoints are accessable using /una path. For example:
      ```
      GET https://localhost:3000/una/students
      ```
      Please check [sample_payloads.json](sample_payloads.json) file for exact JSON format for each API endpoint. 

#### Tests
To run the tests, please use a command line the following:
* `npm test`
    * It will run all the testcases (in test/students.js file).
