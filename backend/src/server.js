import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());


// database connection function
const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser : true });
        const db =  await client.db('react-blog');
        await operations(db);

       await client.close();

    } catch(error) {

        res.status(500).json({ message : 'error connecting database', error})

    }
};



// Routes
app.get('/api/articles/:name', async (req, res) => {

    await withDB(async (db) => {

        //get the URL parameter
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne( { name: articleName } );
        res.status(200).json(articleInfo);

    }, res)

});


// upvotes
app.post('/api/articles/:name/upvote', async (req ,res) => {

        await withDB(async (db) => {
            //get the article name from the url parameter
            const articleName = req.params.name;
            const articleInfo = await db.collection('articles').findOne( { name: articleName } );
            await db.collection('articles').updateOne( { name: articleName }, {
                '$set': {
                    upvotes: articleInfo.upvotes + 1,
                }

        });
        const updatedArticleInfo = await db.collection('articles').findOne({'name': articleName});
        res.status(200).json(updatedArticleInfo);

    }, res);

});

//comments
app.post( '/api/articles/:name/add-comment', async (req, res) => {


    await withDB(async (db) => {

        const articleName = await req.params.name;
        const articleInfo = await db.collection('articles').findOne( { name: articleName} );
        const username = await req.body.username;
        const text = await req.body.text;
        await db.collection('articles').updateOne( { name : articleName }, {
            '$set': {
                comments: articleInfo.comments.concat( { username, text} ),
            }
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);

    }, res);


} );

app.get('/hello', (req,res) => res.send("hello!") );

app.listen(8000, () => console.log("listening on port 8000"));