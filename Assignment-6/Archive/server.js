/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: MEHTAB SINGH JAGDE Student ID: 119003226 Date: 13/12/2023
 ********************************************************************************/
/********************************************************************************

* WEB322 – Assignment 04

*

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

*

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

*

* Name: MEHTAB SINGH JAGDE Student ID: 119003226 Date: 13/12/2023

*

* Published URL: https://cooperative-bull-flip-flops.cyclic.app/

********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/404", function (req, res) {
  res.status(404).render("404", {
    message: "I'm sorry, we're unable to find what you're looking for",
  });
});
app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    legoData
      .getSetsByTheme(theme)
      .then((data) => {
        if (data.length === 0) {
          res.status(404).render("404", {
            message: "I'm sorry, we're unable to find what you're looking for",
          });
        } else {
          res.render("sets", {
            data: data,
          });
        }
      })
      .catch((error) => {
        res.status(404).render("404", {
          message: "I'm sorry, we're unable to find what you're looking for",
        });
      });
  } else {
    legoData
      .getAllSets()
      .then((data) => {
        res.render("sets", {
          data: data,
        });
      })
      .catch((error) => {
        res.status(404).render("404", {
          message: "I'm sorry, we're unable to find what you're looking for",
        });
      });
  }
});
app.get("/lego/sets/:setNum", (req, res) => {
  const setNum = req.params.setNum;
  legoData
    .getSetByNum(setNum)
    .then((data) => {
      if (data) {
        res.render("set", {
          set: data,
        });
      } else {
        res.render("404");
      }
    })
    .catch((error) => {
      res.status(404).render("404", {
        message: "I'm sorry, we're unable to find what you're looking for",
      });
    });
});
legoData.initialize().then(() => {
  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
});