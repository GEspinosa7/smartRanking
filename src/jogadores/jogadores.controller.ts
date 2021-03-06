/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from '../jogadores/jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criaJogadorDto : CriarJogadorDto) : Promise<Jogador>{
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizaJogadorDto : AtualizarJogadorDto,
    @Param ('_id', JogadoresValidacaoParametrosPipe) _id: string) : Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizaJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]>{
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(@Param ('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador>{
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
    return this.jogadoresService.deletarJogador(_id);
  }


}
