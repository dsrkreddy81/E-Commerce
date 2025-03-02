import express from 'express';
import { createProd, deleteProd, getProd, updateProd, getUpdate, searchProd } from './productcontroller.js';

const router=express.Router();

router.get("/",getProd);

router.post("/", createProd);

router.get("/:id",getUpdate);

router.put("/:id", updateProd);

router.delete("/:id", deleteProd);

router.get("/search/:key",searchProd);

export default router;