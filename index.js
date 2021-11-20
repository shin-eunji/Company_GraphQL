const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const enums = require('./typedefs-resolvers/_enums')
const equipments = require('./typedefs-resolvers/equipments')
const givens = require('./typedefs-resolvers/givens')
const supplies = require('./typedefs-resolvers/supplies')
const tools = require('./typedefs-resolvers/tools')
const softwares = require('./typedefs-resolvers/softwares')
const people = require('./typedefs-resolvers/people')

const typeDefs = [
    queries,
    mutations,
    enums,
    equipments.typeDefs,
    givens.typeDefs,
    supplies.typeDefs,
    tools.typeDefs,
    softwares.typeDefs,
    people.typeDefs
]

const resolvers = [
    equipments.resolvers,
    givens.resolvers,
    supplies.resolvers,
    tools.resolvers,
    softwares.resolvers,
    people.resolvers
]

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
