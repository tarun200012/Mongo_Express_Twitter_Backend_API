import express from "express";
import body_parser from "body-parser";
import morgan from "morgan";
import tweetRouter from "./Tweet/TweetRouter.js";
import userRouter from "./User/UserRouter.js";
import {connect} from "./util/database.js";
import {isAuthenticated, signin, signup} from "./util/auth.js";


// import itemRouter from "./item/item.router.js";

const { json, urlencoded } = body_parser;


export const app = express();
// const router = express.Router();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev')) ;

//.........JUST TO SHOW THE EXAMPLE USING ITEM MVC MODEL HOW THINGS WORK..........................................................................................................................................//

// app.use('/api/item',itemRouter);


//writing our own middleware
// const logger = (req, res, next) => {
    // setTimeout(()=>{

    //     console.log('Logging....');

    // },1000);
    // throw new Error("error");
    // try{
    // throw new Error("error");
    // }
    // catch(err)
    // {
    //    //instead of printing error u can handle error by try cath block and jump from this middleware to new code // console.log(err);
    //     next();
    // }
//     console.log('Logging....');
//     next();//after this called one middle ware can jump to next middleware or next code .
// }
// app.use(logger);//to integrate this "logger" middleware into all request that "app" will have.


// router.get('/', (req, res) => {
//     res.send({ message: "router ok get" });
// })
// router.post('/', (req, res) => {
//     res.send({ message: "router ok post" });
//     // next();

// })

//ABOVE IS A REDUNDANT CODE...BECOZ IF ROUTE OF URL IS SAME AND U NEED TO MAKE DIFFERENT CONTROLLER FOR DIFFERENT VERBS THEN USE BELOW STYLE:

// router.route('/')
//     .get((req,res)=>{
//         res.send({ message: "router ok get" });
//     })
//     .post((req,res)=>{
//         res.send({ message: "router ok post" });
//     });
//NOW ABOVE METHOD IS ALSO REDUNDANT AS IF FOR LESS CONTROLLERS IT IS GOOD TO WRITE IN SAME FILE ....
//BUT ITS BETTER TO CREATE DIFFERENT FILES FOR DIFFERENT ROUTES AND THEN EXPORT THEM AS A MODULE.
    



//another middleware which when sees the request which has the path given in "first argument" of "use" method gives functioning to the Router object passed in "2nd argument" to handle request of thype which has the path mentioned.
// app.use('/users', router);

//passing manually middleware in parameter will set an order of middleware i.e. below:
//manually passed middleware>integrated middleware in same file> integrated middleware from importing module... by "use" method.
// app.get('/', (req, res) => {
//     res.send({ message: "get" });
// });
// app.post('/users', logger, (req, res) => {
//     res.send({ message: "post without router" });
// });

// app.post('/', [logger, logger, logger], (req, res) => {
//     res.send({ message: "post" });
// });



// ........................................................................................................................................................................................//

app.use('/signin', signin);
app.use('/signup', signup);
app.use('/api/tweet', isAuthenticated,tweetRouter);
app.use('/api/user', isAuthenticated,userRouter);

export const start = async () => {
    await connect();
    app.listen(3000, () => {
        console.log("Server is up on 3000");
    });
}
 