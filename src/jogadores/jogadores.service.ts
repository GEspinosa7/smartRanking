/* eslint-disable */

import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

  public async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if (jogadorEncontrado && jogadorEncontrado !== null) throw new BadRequestException(`Jogador com email : ${email} já cadastrado`);

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);

    return await jogadorCriado.save();
  }

  public async atualizarJogador(_id: string, atualizaJogadorDto: AtualizarJogadorDto): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado && jogadorEncontrado === null) throw new NotFoundException("Jogador não encontrado");

    await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizaJogadorDto }).exec();
  }

  public async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadorPeloId(_id: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado || jogadorEncontrado === null) throw new NotFoundException("Jogador não encontrado");

    return jogadorEncontrado;
  }

  public async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado || jogadorEncontrado === null) throw new NotFoundException("Jogador não encontrado");

    return await this.jogadorModel.deleteOne({_id}).exec();
  }
 
}
