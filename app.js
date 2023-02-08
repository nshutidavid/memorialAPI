//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");
const dotenv = require('dotenv');

const app = express();

dotenv.config({
  path: 'config.env'
})
const PORT = process.env.PORT || 8080

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});





// Genocide Memorial Sites DB configuration
const memorialSchema = {

  name: String,
  description: String,
  built: String,
  victims: String,
  videoLink: String,
  contactPhone: String,
  contactEmail: String,
  address: String,
  location: String,
  fullDesc: String
};
const Memorial = mongoose.model("Memorial", memorialSchema);

// Visitors DB configuration
const visitorsSchema = {
  fullName: {
    type: String,
    required: true
  },
  organization: String,
  memorialSite: memorialSchema,
  email: String,
  date: String,
  numberOfPeople: Number,
  specialRequirements: String

};
const Visitor = new mongoose.model("Visitor", visitorsSchema);

// Genocide memorial Sites Database
const nyamata = new Memorial({
  name: "Nyamata Genocide Memorial",
  description: "One of Rwanda’s six National Genocide Memorial Sites, the Nyamata Genocide Memorial was desacralized by the Roman Catholic Church on 11th April 1997 and transformed into a memorial to the victims of the genocide. One person is buried inside the church, which also houses victims’ clothes and their belongings. Mass graves are situated behind the church, containing 45,308 genocide victims. The 11th of April every year is dedicated to the commemoration of the victims killed at this site. According to Leon Muberuka, a guide at Nyamata, the number of victims includes those who were killed inside the church, as well as others who were exhumed from surrounding areas. The memorial is located in what was originally the Nyamata Parish.",
  built: "11th April 1997",
  victims: "45,308",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888881",
  contactEmail: "info@nyamata.com",
  address: "Nyamata",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.0120928966876!2d30.091487314490266!3d-2.14905713778126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c354ebb9726b5b%3A0x21f6679fca4350ca!2sNyamata%20Church%20Genocide%20Memorial!5e0!3m2!1sen!2srw!4v1675851442243!5m2!1sen!2srw "

});

const ntarama = new Memorial({
  name: "Ntarama Genocide Memorial",
  description: "The Church of Ntarama was converted into a genocide memorial on 14th April 1995 and is dedicated to the 5,000 people who lost their lives there. One of Rwanda’s six National Genocide Memorial Sites, Ntarama contains human remains, clothing, and artifacts belonging to those who were killed at the church, which remain on display at all times.",
  built: "1st June 2004",
  victims: "5,000",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888882",
  contactEmail: "info@ntarama.com",
  address: "Ntarama",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.1062440270875!2d30.047838114490123!3d-2.112694137681135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcac961c93817d%3A0x7b2580d271b449f1!2sNtarama%20Genocide%20Memorial!5e0!3m2!1sen!2srw!4v1675852166817!5m2!1sen!2srw"

});
const nyarubuye = new Memorial({
  name: "Nyarubuye Genocide Memorial",
  description: "The Nyarubuye Genocide Memorial was created on 14th April 1995 and is located near the Tanzanian border. This area is part of the former commune of Rusumo. The Memorial is located close to a convent of Catholic nuns and its foundation stone was laid in 1995 by the then-Vice President Paul Kagame.",
  built: "14th April 1995",
  victims: "51,000",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888883",
  contactEmail: "info@nyarubuye.com",
  address: "Nyarubuye",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15946.263034944846!2d30.741455209041074!3d-2.31368027379144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c52cd0188771%3A0x1fc0bfa4a2fbf76!2sNyarubuye!5e0!3m2!1sen!2srw!4v1675852491014!5m2!1sen!2srw"

});

const murambi = new Memorial({
  name: "Murambi Genocide Memorial",
  description: "The Murambi Genocide Memorial was created on 21st April 1995. During the genocide, the Tutsis of this region sought sanctuary at Murambi, where a technical school was being constructed. Today Murambi serves as one of six National Genocide Memorial Sites, and contains the remains of approximately 50,000 victims killed at the technical school, including some remains exhumed from the surrounding area. Only 34 people from this site are believed to have survived the genocide. The 21st of April every year is dedicated to the commemoration of the victims of Murambi.",
  built: "21st April 1995",
  victims: "50,000",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888884",
  contactEmail: "info@murambi.com",
  address: "Murambi",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.1540097170487!2d29.565576514492065!3d-2.4557856387119217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c319ad1342f6a1%3A0x21ced7c2fff50b5f!2sMurambi%20Genocide%20Memorial%20Centre!5e0!3m2!1sen!2srw!4v1675852669022!5m2!1sen!2srw"

});
const bisesero = new Memorial({
  name: "Bisesero Genocide Memorial",
  description: "Also known as the memorial of resistance, Bisesero Genocide memorial site is known so much by Rwandans for its resistance during the 1994 genocide against the Tutsis. Between the month of May and June 1994 is when the interahamwe came to carry out the massacres that sent over 40,000 Tutsis dead.",
  built: "1997",
  victims: "50,000-60,000",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888885",
  contactEmail: "info@bisesero.com",
  address: "Bisesero",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255161.54517648343!2d29.0611087328125!3d-2.1918849999999765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c2d46ebc5f20f9%3A0xadb2ff3f21d4ad1f!2sBisesero%20Genocide%20Memorial!5e0!3m2!1sen!2srw!4v1675852902803!5m2!1sen!2srw"

});
const nyange = new Memorial({
  name: "Nyange Genocide Memorial",
  description: "Nyange sector where the memorial is located is among the sectors that experienced cruel and mass killings in former Kibuye Prefecture. During the genocide, similar to other places in the country, Nyange Parish was regarded as a sacred place where victims would run for safety. It’s been their custom whenever killings happened in this region. However, this time it was different. Tutsis who had camped at the Parish were gruesomely killed",
  built: "1999",
  victims: "7,798",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888885",
  contactEmail: "info@nyange.com",
  address: "Nyange",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.2348570370164!2d29.587472721066376!3d-2.061985732714067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcd1afbc4c2bdf%3A0xed6a63e9e176ed34!2sNyange%20Hero&#39;s%20School!5e0!3m2!1sen!2srw!4v1675853314420!5m2!1sen!2srw",
});

const rebero = new Memorial({
  name: "Rebero Genocide Memorial",
  description: "Rebero Genocide Memorial does not host bodies of Tutsis who were killed in the area as it’s the case for other memorials. It is a resting place to politicians who were killed during the genocide either because they were Tutsis or were against the brutal regime and became victims of their political views because they were portrayed to be an impediment to   the planned genocide.  Other victims buried at the memorial are those who were exhumed from a mass grave at CHUK, Nyamirambo at ONATRACOM, Lycee de Kigali, Gikondo, Gitega, etc. It is a resting place for 12 politicians and more than 14,400 victims of genocide against the Tutsi. Commemoration of the politicians who were killed before and during genocide against the Tutsi began in 2006. This was after a cabinet resolution of 21/06/2006 that designated July 2, 2006 a day to commemorate politicians who are victims of the genocide against the Tutsi and the event would take place at Rebero Genocide Memorial. In the subsequent years, this event was marked at the end of the memorial week which takes place on April 13th every year.",
  built: "21/06/2006",
  victims: "14,400",
  videoLink: "https://www.youtube.com/watch?v=DWA-CtugUfQ",
  contactPhone: "25078888886",
  contactEmail: "info@rebero.com",
  address: "Rebero, Kicukiro",
  location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5530937965295!2d30.05137038295545!3d-1.9308006715342267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca40387460893%3A0x520a96e55654da22!2sKigali%20Genocide%20Memorial!5e0!3m2!1sen!2srw!4v1675854216466!5m2!1sen!2srw",
})

const defaultMemorials = [nyamata, ntarama, nyarubuye, murambi, bisesero, nyange, rebero];

// Save Database
Memorial.find({}, function(err, foundMemorials) {
  if (foundMemorials.length === 0) {
    Memorial.insertMany(defaultMemorials, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully Saved all Memorials in the Database");
      }
    })
    // res.redirect("/")
  } else {
    console.log("Memorials already in The Database");
    // res.render('home', {homeContent: homeStartingContent, posts:foundPosts})
  }

})

// Route Root
app.get("/", function(req, res) {
  Memorial.find({}, function(err, foundMemorials) {
    res.render('index', {
      memorials: foundMemorials
    })
  })

});

//Dynamic links
app.get("/:memorialId", function(req, res) {
  const requestedMemorialId = req.params.memorialId;

  Memorial.findOne({
    _id: requestedMemorialId
  }, function(err, foundMemorial) {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundMemorial.name);
      // VM12:6750 crbug/1173575, non-JS module files deprecated.
      res.render('memorial', {
        memorialTitle: foundMemorial.name,
        memorialDescription: foundMemorial.description,
        builtDay: foundMemorial.built,
        numberOfVictims: foundMemorial.victims,
        youtubeLink: foundMemorial.videoLink,
        memorialAddress: foundMemorial.address,
        memorialPhone: foundMemorial.contactPhone,
        memorialEmail: foundMemorial.contactEmail,
        googleMapMemorial: foundMemorial.location
      });

    };

  })

});

//////////////////////// About us //////////////////////////////////////
app.get("/memorials/:about", function(req, res) {
  Memorial.find({}, function(err, foundMemorials) {
    res.render('booking', {
      memorials: foundMemorials
    })
  });
});


//////////////////////// Register //////////////////////////////////////
app.get("/register", function(req, res) {
  Memorial.find({}, function(err, foundMemorials) {
    res.render('index', {
      memorials: foundMemorials
    })
  });
});
//////////////////////// Booking //////////////////////////////////////
app.get("/:booking", function(req, res) {

  Memorial.find({}, function(err, foundMemorials) {
    res.render('booking', {
      memorials: foundMemorials
    })
  });
})
// Visitors Database

app.post('/booking', function(req, res) {
  // console.log(req.body);

  Memorial.find({}, function(err, foundMemorials) {
    res.render('index', {
      memorials: foundMemorials
    })
  });
  const newVisitor = new Visitor({

    fullName: req.body.fullName,
    organization: req.body.organization,
    memorialSite: req.body.memorialSite.name,
    email: req.body.email,
    date: req.body.date,
    numberOfPeople: req.body.numberOfPeople,
    specialRequirements: req.body.requirement
  });
  newVisitor.save(function(err) {
    if (err) {
      console.log(err);
    } else {

      res.render("booking")
    }
  })
  console.log(req.body.memorialSite);
});

//////////////////////// API MEMORIAL //////////////////////////////////////

// /////////////// Request targeting all articles //////////////////
app.route("/memorials")
  //Read
  .get(function(req, res) {
    Memorial.find(function(err, foundMemorials) {
      if (!err) {
        res.send(foundMemorials)
      } else {
        res.send(err)
      }
    });
  })
  //Create
  .post(function(req, res) {
    const newMemorial = new Memorial({
      name: req.body.name,
      description: req.body.description,
      built: req.body.built,
      victims: req.body.victims,
      videoLink: req.body.videoLink,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      address: req.body.address,
      location: req.body.location,
      fullDesc: req.body.fullDesc
    });
    newMemorial.save(function(err) {
      if (!err) {
        res.send("Successfully Added!!")
      } else {
        res.send(err)
      }
    });
  })
  // Delete
  .delete(function(req, res) {
    Memorial.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all Memorials")
      } else {
        res.send(err)
      }
    });
  });
// /////////////// Request targeting a specific article //////////////////
app.route("/memorials/:memorialName")
  .get(function(req, res) {
    Memorial.findOne({
      name: req.params.memorialName
    }, function(err, foundMemorial) {
      if (foundMemorial) {
        res.send(foundMemorial)
      } else {
        res.send("No memorial match that name")
      }
    });
  })
  .put(function(req, res) {
    Memorial.updateOne({
        name: req.params.memorialName
      }, {
        $set: {
          name: req.body.name
        },
        $set: {
          description: req.body.description
        },
        $set: {
          built: req.body.built
        },
        $set: {
          victims: req.body.victims
        },
        $set: {
          videoLink: req.body.videoLink
        },
        $set: {
          contactPhone: req.body.contactPhone
        },
        $set: {
          contactEmail: req.body.contactEmail
        },
        $set: {
          address: req.body.address
        },
        $set: {
          location: req.body.location
        },
        $set: {
          fullDesc: req.body.fullDesc
        }
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Successfully Updated")
        } else {
          res.send(err)
        }
      }
    );
  })
  .patch(function(req, res) {
    Memorial.updateOne({
        name: req.params.memorialName
      }, {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Successfully Updated")
        } else {
          res.send(err)
        }
      }
    );
  })
  .delete(function(req, res) {
    Memorial.deleteOne({
        name: req.params.memorialName
      },
      function(err) {
        if (!err) {
          res.send("Successfully deleted")
        } else {
          res.send(err)
        }
      }
    )
  })







app.listen(PORT, function() {
  console.log(`The server is running on port ${PORT}`)
});
