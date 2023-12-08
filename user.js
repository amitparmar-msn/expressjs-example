const { MongoClient } = require('mongodb');
const express = require('express');
const Router = express.Router();
const app = express();
const port = 8080;



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

// Router.route('/user')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         async function main() {
//             const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
//             const client = new MongoClient(uri);
//             try {
//                 await client.connect();
//                 await findOneListingByName(client, 'Amit Parmar')
//                 const result = await client.db("test-db").collection("student-details").find({});
//                 if (result) {
//                     console.log(`Found a listing in the collection with the name ${nameOfStudent}`);
//                     console.log(result);
//                 } else {
//                     console.log(`No listing found with the name ${nameOfStudent}`);
//                 }
//             } catch (error) {
//                 console.error(error)
//             } finally {
//                 await client.close();
//             }
//         }
//         main().catch(console.error);
//         res.end('When a GET request is made, then this ' + 'is the response sent to the client!');
//     })
//     .post((req, res, next) => {
//         res.end('When a POST request is made, then this '
//             + 'is the response sent to the client!');
//     })
//     .put((req, res, next) => {
//         res.end('When a PUT request is made, then this '
//             + 'is the response sent to the client!');
//     })
//     .delete((req, res, next) => {
//         res.end('When a DELETE request is made, then this '
//             + 'is the response sent to the client!');
//     });

// async function main() {
//     const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         // await listDatabases(client);

//         // await createListing(client, {
//         //     name: "Amit Parmar",
//         //     rollno: "58",
//         //     course: "MCA"
//         // });
//         await findOneListingByName(client, 'Amit Parmar')

//     } catch (error) {
//         console.error(error)
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

async function createStudent(client, studentDetail) {
    const result = await client.db("test-db").collection("student-details").insertOne(studentDetail);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function deleteStudent(client, enrollNumber) {
    const result = await client.db("test-db").collection("student-details").deleteOne({ enrollNumber: enrollNumber });
    if (result.deletedCount === 1) {
        console.log(`Document deleted successfully.`);
    }
}
async function findOneListingByName(client, nameOfStudent) {
    const result = await client.db("test-db").collection("student-details").findOne({});
    if (result) {
        console.log(`Found a listing in the collection with the name ${nameOfStudent}`);
        console.log(result);
    } else {
        console.log(`No listing found with the name ${nameOfStudent}`);
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("databases");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}