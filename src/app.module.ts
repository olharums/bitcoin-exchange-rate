import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [HttpModule],
})
export class AppModule {}
