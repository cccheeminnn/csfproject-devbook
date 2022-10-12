module.exports = [
    {
        context : [ '/api/**' ], // match all these requests
        target : 'http://localhost:8080', // springboot
        secure: false // not using https
    }
]
