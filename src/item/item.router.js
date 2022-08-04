import { Router } from "express";
import {getfun,postfun} from "./item.controller.js";
const router= Router();

// /api/item
router.route('/')
    .get((req,res)=>{
        getfun(req,res);
    })
    .post((req,res)=>{
        postfun(req,res);
    });


// /api/item/:id
router.route('/:id')
    .put()
    .delete();
    
export default router;    