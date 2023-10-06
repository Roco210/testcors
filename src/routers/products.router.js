import Router from 'express';
import { paginateAllProd, SerchProdbyID, createProd,deleteProd, modifyProd} from '../controllers/products.controllers.js';
const router = Router();

router.get('/',paginateAllProd)

router.get('/:pid', SerchProdbyID)

router.post('/', createProd )

router.put('/:pid', modifyProd )

router.delete('/:pid', deleteProd)

export default router;
