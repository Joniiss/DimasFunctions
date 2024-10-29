/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import * as moment from "moment";

const app = admin.initializeApp();
const db = app.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

exports.recebeMedidas = onRequest({region: "southamerica-east1"},
  (req, res) => {
    functions.logger.info(req.body);

    const medidas = {
      hubId: req.body.hubId,
      tempAr: req.body.tempAr,
      tempSolo: req.body.tempSolo,
      umAr: req.body.umAr,
      umSolo: req.body.umSolo,
      timestamp: moment().utcOffset(-3).format(),
    };

    db.collection("Dados").add(medidas);

    res.status(200).send("Recebido.");
  });

exports.novoUsuario = onRequest({region: "southamerica-east1"},
  async (req, res) => {
    const user = await getAuth().getUserByEmail(req.body.email);

    const arduino = {
      user: user.uid,
      nome: req.body.nome,
    };

    const docId = await db.collection("Arduinos").add(arduino);

    res.status(200).send(docId.id);
  });

// firebase deploy --only functions:aaaa
