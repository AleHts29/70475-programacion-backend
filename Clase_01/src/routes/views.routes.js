import { Router } from 'express';
import cookieParser from 'cookie-parser'

const router = Router();

// sin firma
// router.use(cookieParser())

// con firma
router.use(cookieParser('CoderC0ki3firm4d4'))

// Apis
router.get('/setCookie', (req, res) => {
    let data = "Esto es una cookie de  prueba"

    // Todo -  Data deberia estar cifrado

    // sin firma
    // res.cookie('coderCookie', data, { maxAge: 50000 }).send('Cookie asignada con exito!')


    // con firma
    res.cookie('coderCookie', data, { maxAge: 50000, signed: true }).send('Cookie asignada con exito!')
})




router.get('/getCookie', (req, res) => {
    // res.send(req.cookies) <- sin firma

    res.send(req.signedCookies) // con firma
})



router.get('/deleteCookie', (req, res) => {
    res.clearCookie('coderCookie').send('Cookie deleted')
})





// Export
export default router;