require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z8yqdyj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()



// collection
const dataCollection = client.db('collegeDb').collection('collegeData')
const researchCollection = client.db('collegeDb').collection('research')
const reviewCollection = client.db('collegeDb').collection('reviews')
const userCollection = client.db('collegeDb').collection('userInfo')

// College data

app.get('/collegeData', async (req, res) => {
    const result = await dataCollection.find().toArray();
    res.send(result);
})

// research data
app.get('/research', async (req, res) => {
    const result = await researchCollection.find().toArray();
    res.send(result);
})
// reviews data
app.get('/reviews', async (req, res) => {
    const result = await reviewCollection.find().toArray();
    res.send(result);
})


// create data from user
app.post('/userInfo',async(req, res)=>{
    const newUser = req.body;
    console.log(newUser);
    const result = await userCollection.insertOne(newUser);
    res.send(result);
})






// test purpose
app.get('/', (req, res) => {
    res.send('college is running')
})

app.listen(port, () => {
    console.log(`college is running on port ${port}`);
})