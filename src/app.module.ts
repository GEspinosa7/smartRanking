/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestproject:159753777@cluster0.4p8qv.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
