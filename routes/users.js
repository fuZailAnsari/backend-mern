const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const UserController = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');
 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, avatar, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})
// router.use(fileUpload({
//     useTempFiles: true
// }))
router.post('/register', UserController.registerUser)
 

 

router.post('/login', UserController.isLogin)

router.put('/logout', UserController.Logout)

router.post('/forgetpasssword', UserController.forgotPassword)

router.put('/password/reset/:token', UserController.resetPassword)

router.get('/me', isAuthenticated, UserController.getUserDetails)

router.put('/updatepassword', isAuthenticated, UserController.updatePassword)

// router.use(fileUpload({
//     // useTempFiles: true
// }))
router.put('/me/updateProfile', isAuthenticated, UserController.updateUserProfile)

router.get('/admin/users', isAuthenticated, authorizeRoles('admin'), UserController.allUser)

router.get('/admin/users/:id', isAuthenticated, authorizeRoles('admin'), UserController.getDetails)

router.put('/admin/user/update/:id', isAuthenticated, authorizeRoles('admin'), UserController.updateUser)

router.delete('/admin/user/delete/:id', isAuthenticated, authorizeRoles('admin',), UserController.deleteUser)


module.exports = router