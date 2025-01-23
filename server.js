var express = require("express");
var cors = require("cors");
var { MongoClient } = require("mongodb");

var server = express();
server.use(cors());
server.use(express.json());

const MongoURL = "";
var mongodb = new MongoClient(MongoURL);
var accountCol = mongodb.db("TourGuider").collection("Account");
var guiderCol = mongodb.db("TourGuider").collection("Guider");
var travelerCol = mongodb.db("TourGuider").collection("Traveler");
var orderCol = mongodb.db("TourGuider").collection("Order");

// ----------------------------------------- Account CRUD --------------------------------

server.post("/register", async (req, res) => {
    //console.log("hey");
    var { email, username, password, country, city, role } = req.body;
    //console.log(req.body)
    var isExist = (await accountCol.findOne({ email })) != null;
    if (isExist) {
        res.status(300).send({ message: "Email exist" })
        return;
    }
    accountCol.insertOne({
        email,
        username,
        password,
        country,
        city,
        role,
        avatar: "data:image/png;base64,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",
        phone: "",
        description: "",
        active: true,
    }).then(() => {
        try {
            switch(role) {
                case "Traveler":
                    travelerCol.insertOne({
                        email,
                        status: "Active",
                    })
                    break;
                case "Guider":
                    guiderCol.insertOne({
                        email,
                        rating: 0,
                        status: "Active",
                    })
                    break;
                default:
                    console.log("?");
                    break;
            }
        }
        catch (e) {
            throw e;
        }
        res.status(200).send({ message: "OK" });
    }).catch((e) => {
        res.status(400).send({ message: "Not OK: " + e });
    })
})
server.post("/login", async (req, res) => {
    var { email, password } = req.body;
    console.log(req.body)
    var accountResult = await accountCol.findOne({ email, password })
    console.log(accountResult)
    if (accountResult) {
        res.status(200).send({
            message: "Login OK",
            email,
        })
        return;
    }
    res.status(300).send({
        message: "Invalid username/password"
    })
})

server.get("/account/type/:type", async (req, res) => {
    var { type } = req.params;
    console.log("This");
    switch (type) {
        case "Traveler": 
            return res.status(200).send(await accountCol.find({ role: "Traveler" }).toArray());
        case "Guider":
            return res.status(200).send(await accountCol.find({ role: "Guider" }).toArray());
        default:
            console.log("type is", type);

            return res.status(300).send({ msg: "Not found" });
    }
})

server.get("/account/:email", async (req, res) => {

    var { email } = req.params;
    return res.status(200).send(await accountCol.findOne({ email }))
})

server.put("/account/:email", async (req, res) => {
    var { email } = req.params;
    console.log(req.body)
    var { username, country, city, avatar, phone, description } = req.body;
    var result = await accountCol.findOne({ email });
    if (result) {
        accountCol.updateOne(result, {
            $set: {
                username,
                country,
                city,
                avatar,
                phone,
                description
            }
        })
        return res.status(200).send({ msg: "Update OK" })
    }
    return res.status(300).send({ msg: "Account not found" })
})

server.delete("/account/:email", async (req, res) => {
    var { email } = req.params;
    try {
        var result = await accountCol.findOne({ email });
        if (result) {
            if (result.active) {
                accountCol.updateOne(result, {
                    $set: {
                        active: false,
                    }
                })
                return res.status(200).send({ msg: "Delete OK" })
            }
        }
        return res.status(200).send({ msg: "User already suspended" })
    }
    catch (e) {
        return res.status(300).send({ msg: "Delete not OK " + e })
    }
})
// ----------------------------------------------------------------------------------------

// ----------------------------------------- Traveler CRUD --------------------------------


server.get("/travelers", async (req, res) => {
    var result = await travelerCol.find({}).toArray();
    res.status(200).send(result);
    return;
})

server.get("/travelers/:email", async (req, res) => {
    var { email } = req.params;
    var result = await travelerCol.findOne({ email });
    if (result) {
        return res.status(200).send(result);
    }
    
    return res.status(300).send({ msg: "Traveler not found" });
})

server.post("/travelers/post", async (req, res) => {
    return res.status(300).send({ message: "Cannot directly post travelers "})
})

// ----------------------------------------------------------------------------------------
// ----------------------------------------- Guider CRUD --------------------------------


server.get("/guiders", async (req, res) => {
    var result = await guiderCol.find({}).toArray();
    res.status(200).send(result);
    return;
})

server.get("/guiders/:email", async (req, res) => {
    console.log(1);
    var { email } = req.params;
    var result = await guiderCol.findOne({ email });
    if (result) {
        return res.status(200).send(result);
    }
    
    return res.status(300).send({ msg: "Guider not found" });
})

server.post("/guiders/post", async (req, res) => {
    return res.status(300).send({ message: "Cannot directly post travelers "})
})

// ----------------------------------------------------------------------------------------
// ----------------------------------------- Order CRUD --------------------------------


server.get("/orders", async (req, res) => {
    var result = await orderCol.find({}).toArray();
    res.status(200).send(result);
    return;
})

server.get("/orders/:email", async (req, res) => {
    var { email } = req.params;
    var result = await orderCol.find({ guider: email }).toArray();
    res.status(200).send(result);
    return;
})

server.post("/orders/post", async (req, res) => {
    var { traveler, guider, schedule, hour, price, rating } = req.body;
    var at = new Date();
    var msg = "";
    var rand = Math.round(Math.random() * 3);
    switch (rand) {
        case 1:
            msg = "Very good guider, he's very funny!"
            break;
        case 2:
            msg = "He took us to eat yummy foods, he's the best!"
            break;
        case 3:
            msg = "He's a bit boring, he didn't talk much"
            break;
        default:
            msg = "He's very talk-a-tive, our team like him the most!";
            break;
    }
    orderCol.insertOne({
        traveler,
        guider,
        schedule,
        hour,
        price,
        feedback: msg,
        createdAt: new Date(),
        finishedAt: new Date(new Date().setHours(new Date().getHours() + 2)),
        finished: true,
        rating: rating
    })
    .then((r) => res.status(200).send({ msg: "Order placed" }))
    .catch((e) => res.status(300).send({ msg: "Error placing order: " + e }))
})

// ----------------------------------------------------------------------------------------

server.get("/ping", async (req, res) => {
    res.status(200).send("OK");
})


server.listen(8081, () => {
    console.log("Server is online");
    mongodb.connect().then(() => {
        console.log("Connected to MongoDB!");
    })
})
