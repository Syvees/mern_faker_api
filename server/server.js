const express = require ('express');
const { faker } = require ('@faker-js/faker')

const app = express ();
const port = 8000;

app.use( express.json ());
app.use( express.urlencoded({extended:true}))

// FUNCTION THAT CREATES A NEW USER
const newUser = () => ({ // IMPLICIT RETURN
    id: faker.database.mongodbObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password()
}) 

// FUNCTION THAT CREATES A NEW COMPANY
const newCompany = () => ({
    id: faker.database.mongodbObjectId(),
    name: faker.company.name(),
    address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
    }
})

// ROUTE THAT RETURNS A NEW USER
app.get ("/api/users/new", (req, res) => {
    res.json(newUser())
})

// ROUTE THAT RETURNS A NEW COMPANY
app.get ("/api/companies/new", (req, res) => {
    res.json(newCompany())
})

// ROUTE THAT RETURNS A NEW COMPANY AND A USER
app.get ("/api/user/company", (req, res) => {
    res.json({user: newUser(),
            company: newCompany()
    })
})

app.listen(port, () => console.log (`Listening on port: ${port}`))