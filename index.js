const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//file send
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
})

// app.get('/', (req,res) =>{
//     res.send('hello i am mam mam')
// })

const { MongoClient, ServerApiVersion } = require('mongodb');
const Collection = require('mongodb/lib/collection');
const uri = "mongodb+srv://mamun113:2z4Z5cqsJ23U6EvX@mamun0.nzshl07.mongodb.net/mamundata?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useUnifiedTopology: true

  }
});



   

app.listen(3000);



async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
  
      await client.connect();
      // Send a ping to confirm a successful connection
           
  
  
      console.log(" mamun Pinged your deployment. You successfully connected to MongoDB!");
    } 
    
    finally {
      // Ensures that the client will close when you finish/error
      // const collection = await client.db("mamundata").collection( "akondata" );
      // const collection = await client.db("mamundata").collection( "akondata" );
      




      // const organiccollection = await client.db("organicData").collection( "product" );
      // const organiccollection1 = await client.db("organicData").collection( "producted" );
      const zinnat = await client.db("zinnatdatabase").collection( "ahonaf" );
      // const zinnat = await client.db("mamundata").collection( "akondata" );
      app.get('/product', (req,res) => {
        zinnat .find({}).limit(300)
        .toArray((err,documents)=>{
          res.send(documents);

      })
      // const zinnat = await client.db("zinnatdatabase").collection( "ahonaf" );
      // app.get('/mamun', (req,res) => {
      //   zinnat.find({}).limit(4)
      //   .toArray((err,documents)=>{
      //     res.send(documents);

      // })
      
      })

 //update product
 app.get('/product/:id', (req, res) => {
  zinnat .find({_id: ObjectId(req.params.id)})
  .toArray((err, document) => {
    res.send(document[0]);
  })
 })
//update 1
 app.patch('/update/:id', (req, res) =>{
  console.log(req.body.price);
  zinnat.updateOne({_id: ObjectId(req.params.id)},
  {
    $set: {name: req.body.name, address: req.body.address, price: req.body.price, quantity: req.body.quantity, mobile: req.body.mobile }
  })
  .then(result =>{
    res.send(result.modifiedCount > 0);
    // console.log(result);
  })
  
 })

  //update product
      app.post("/addProduct", (req, res) =>{
        const ahonafff = req.body;
        zinnat.insertOne(ahonafff)
        .then(result =>{
          console.log('data added successfully')
          // res.send('success');
          res.redirect('/')
        })})


        //delete

        app.delete('/delete/:id', (req, res) =>{
          zinnat.deleteOne({_id: ObjectId(req.params.id)})
          .then(result => {
            // console.log(result);
            res.send(result.deletedCount > 0);
          })
        })
 //delete

          //     const organiccollection1 = await client.db("organicData").collection( "producted" );

  //     const product = ({name: "mango", price: 30, quantity: 20});
  // collection.insertOne(product)
  // const productt = ({name: "mamun", age: 30, address: "barisal"});
  // collection.insertOne(productt)

  // const orgnicproduct = ({name: "ahonaf", age: 30, address: "barisal"});
  // organiccollection.insertOne(orgnicproduct)
 
  // const orgnicproduct12 = ({name: "ahonaf", age: 30, address: "barisal"});
  // organiccollection1.insertOne(orgnicproduct12)
 
      // await client.close();
      // .then(result =>{
      //   console.log("one product added")
      // })
    }
}
  run().catch(console.dir);
  
  
  // app.listen(3000);
