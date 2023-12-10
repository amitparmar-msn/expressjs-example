const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get("/user", async function (req, res) {
    const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        return await client.db("test-db").collection("student-details").find().toArray().then((result) => {
            return res.send(result)
        })
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
    res.send("No data found!");
});
app.post("/user", async function (req, res) {
    const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log(req)
        const result = await client.db("test-db").collection("student-details").insertOne(
            {
                name: req.body.name,
                course: req.body.course
            }
        );
        return res.send(`New listing created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
    res.send("Action failed!");
});
app.delete("/user/:id", async function (req, res) {
    const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log(req.params)
        const result = await client.db("test-db").collection("student-details").deleteMany({ _id: new ObjectId(req.params.id) });
        return res.send(`${result.deletedCount} student deleted.`);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
    res.send("Action failed!");
});
app.put("/user", async function (req, res) {
    const uri = "mongodb+srv://dcsuser:dcsuser@test-db.lk92wsx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const updatedDoc = {
            $set: {
                course: `BCA`
            }
        }
        const result = await client.db("test-db").collection("student-details").updateMany({ name: "Amit Parmar" }, updatedDoc);
        return res.send(`${result.modifiedCount} student updated.`);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
    res.send("Action Failed!");
});
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});