const isAuthenticated = ((req, res, next)=>{
console.log("middleware is invoked")
next()
})

module.exports = {isAuthenticated}