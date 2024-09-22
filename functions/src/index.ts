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

const app = admin.initializeApp();
const db = app.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

exports.recebeMedidas = onRequest({region: "southamerica-east1"},
  (req, res) => {
    functions.logger.info(req.body);
    functions.logger.debug(req.body.s1);
    functions.logger.debug(req.body.s2);
    functions.logger.debug(req.body.s3);

    db.collection("arduinos").add(req.body);

    res.status(200).send("Recebido.");
  });

// firebase deploy --only functions:aaaa
