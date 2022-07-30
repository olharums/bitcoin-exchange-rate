import * as nodemailer from "nodemailer";
import { google } from "googleapis";
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = new Promise((resolve, reject) => {
  OAuth2Client.getAccessToken((err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "setp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: "notrealnotreply@gmail.com",
    clientId: process.env.CLIENT_ID,
    accessToken,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
