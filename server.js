// Etape 1
const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

let password = "myPassword";


// Etape 2 :  Se connecter à la  base de données
mongoose.connect(`mongodb+srv://Precieux:${password}@clusterexpressopenclass.g9rsjrd.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Etape 3
// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.
app.use(express.json());

app.get('/contact', (req, res) => {
    Contact.find()
        .then(
            (contacts) => {
                res.status(200).json(contacts);
            }
        )
        .catch(
            (error) => {
                res.status(400).json({
                    error
                })
            }
        )
});

app.post("/contact", (req, res) => {
   const contact = new Contact ({
    id: req.params.id,
    name: req.body.name,
    firstName: req.body.firstName,
    lastName: req.body.lastName
   }) 

   contact.save().then(
    () => {
      res.status(201).json({
        message: 'Contact saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.put("/contact/:id", (req, res) => {
    const contact = new Contact({
        _id: req.params.id,
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    Contact.updateOne({_id: req.params.id}, contact)
        .then(
            () => {
                res.status(201).json({
                  message: 'Contact updated successfully!'
                });
            })
        .catch(
            (error) => {
                res.status(400).json({
                error: error
                });
            });
})

app.delete("/contact/:id", (req, res) => {
    Contact.deleteOne({_id: req.params.id})
        .then(
            () => {
                res.status(200).json({
                  message: 'Deleted!'
                });
              }
        )
        .catch(
            (error) => {
                res.status(400).json({
                error: error
                });
            });
})
const server = http.createServer(app);
server.listen(3000);