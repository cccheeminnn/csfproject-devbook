module.exports = [
  {
    context: [
      '/api/**'
    ], // match all these requests
    target: 'http://localhost:8080', // springboot, http://localhost:8080/api/**
    secure: false // not using https
  },
  {
    context: [
      '/authenticate'
    ], // match all these requests
    target: 'http://localhost:8080', // springboot, http://localhost:8080/authenticate
    secure: false // not using https
  },
]
