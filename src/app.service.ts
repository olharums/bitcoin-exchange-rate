import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SubscribeDto } from "./dto/subscribe.dto";
import { transporter } from "./nodemailer";
import * as fs from "fs";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getRate() {
    const response = await this.httpService.axiosRef.get(
      "https://api.blockchain.com/v3/exchange/tickers/BTC-USD"
    );
    const USDtoBTC = response.data.price_24h;

    const resp = await this.httpService.axiosRef.get(
      "https://bank.gov.ua/NBU_Exchange/exchange_site?&valcode=usd&sort=exchangedate&order=desc&json"
    );
    const UAHtoUSD = resp.data[0].rate;

    const UAHtoBTC = Math.round(UAHtoUSD * USDtoBTC);

    return UAHtoBTC;
  }

  async subscribe(dto: SubscribeDto): Promise<any> {
    const data = fs.readFileSync("email_database.txt");
    const emails = data.toString().split("\n");
    if (emails.includes(dto.email)) {
      return { error: "error" };
    }

    fs.appendFile("email_database.txt", `${dto.email}\n`, (err) => {
      if (err) throw err;
    });

    return {
      status: 200,
      message: `You are subscribed with the email ${dto.email}`,
    };
  }

  async sendEmails() {
    const response = await this.httpService.axiosRef.get(
      "https://api.blockchain.com/v3/exchange/tickers/BTC-USD"
    );
    const USDtoBTC = response.data.price_24h;

    const resp = await this.httpService.axiosRef.get(
      "https://bank.gov.ua/NBU_Exchange/exchange_site?&valcode=usd&sort=exchangedate&order=desc&json"
    );
    const UAHtoUSD = resp.data[0].rate;

    const UAHtoBTC = Math.round(UAHtoUSD * USDtoBTC);

    const data = fs.readFileSync("email_database.txt");
    const emails = data.toString().split("\n").join(",");

    await transporter.sendMail({
      from: "Bitcoin exchange rate",
      bcc: emails,
      subject: "Fresh information about bitcoin exchange rate",
      text: `Current bitcoin exchange rate is ${UAHtoBTC} UAH`,
    });

    return { status: 200, message: "Sent!" };
  }
}
