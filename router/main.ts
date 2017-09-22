import { Router } from 'express';
var router = Router();

router.get('/',function(req, res){
	res.sendFile('/views/index.html');
});

export { router } 