import { FRASES } from './frase-mock';
import { Frase } from './../../shared/frase.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy  {


  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a frase:';
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0
  public tentativas: number = 3

  @Output() public encerrarJogo:EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    console.log('Componente painel foi destruido')
  }
  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtbr == this.resposta) {
    
      //trocar pergunta da rodada
      this.rodada++
      this.atualizaRodada()

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      if(this.rodada ===4){
       this.encerrarJogo.emit('Vitória')
      }
    } else {
      this.tentativas--
      if(this.tentativas === -1){
       this.encerrarJogo.emit('Derrota')
      }
    }
  }
  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
