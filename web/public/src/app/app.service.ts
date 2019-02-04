import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit  {
  dbs = [];
  dbSelected: any = -1;
  listKeys: object = [];  
  keyInfo: any = {};
  servers: object = [];
  serverParam: any;
  serverSelected: object = {};
  serverInfo: object;
  msgErro: string;
  baseUrl = 'http://api.'+window.location.hostname+"/";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {}

  /**
   * Controlador de retorno de dados
   * @param {string} variable   É passado em formato string o nome da variável 
   *                            que deverá ser armazenado os dados de retorno
   * @param {any} dataReturn    Dados de retorno da consulta da API
   * @param {string} err        Mensagem que deverá ser mostrado em caso de erro
   */
  returnControl( variable , dataReturn , err)
  {
    if( dataReturn != undefined ){
      this[variable] = dataReturn
    } else {
      this.msgErro = err;
    }
  }

  getServerParam(route){
    route.paramMap.subscribe(params => {
        this.serverParam = params.get("server");
    });
  }

  getConfigServers(){
    return this.http.get(this.baseUrl+'config_servers').subscribe((res: []) => {
      this.returnControl( 'servers' , res , "Servidores não encontrados!");
    });
  }

  getServerHostInfo(){
    return this.http.get(this.baseUrl+this.serverParam+'/host/info').subscribe((res: []) => {
      this.returnControl( 'serverSelected' , res , "Dados de Host não encontrado!");
    });
  }

  getServerInfo(){
    return this.http.get(this.baseUrl+this.serverParam+'/server/info');
  }
  

  getDbs(){
    return this.http.get(this.baseUrl+this.serverParam+'/dbs').subscribe((res: []) => {
      this.returnControl( 'dbs' , res , "Ocorreu um erro");
    });
  }

  getKeys(db){
    return this.http.get(this.baseUrl+this.serverParam+'/'+db+'/getkeys').subscribe((res: []) => {
      this.returnControl( 'listKeys' , res , "Chaves não encontradas!");
      this.returnControl( 'dbSelected' , db , "Erro ao tentar selecionar este banco!");
    });
  }

  getKeyInfo(key,db){
     return this.http.get(this.baseUrl+this.serverParam+'/'+db+'/getkeyinfo/'+key);
  }

  setKey(data){
    return this.http.post(this.baseUrl+this.serverParam+'/setkey',data).subscribe((res: any) => {      
       if(res){
         if(data.edit || data.newValue || data.editTtl ){
           this.getKeyInfo(data.key, this.dbSelected ).subscribe( res => {
               this.keyInfo = res;
           });
         }
         this.getKeys( this.dbSelected );
       } else {
         this.returnControl( null , null , "Ocorreu um erro ao tentar adicionar dados");
       }
    });
  }

  deleteKey(key){
    return this.http.delete(this.baseUrl+this.serverParam+'/'+this.dbSelected+'/deleteKey/'+key).subscribe( res => {
        if( res ){
           this.getKeys( this.dbSelected );
        } else {
          this.returnControl( null , null , "Ocorreu um erro ao tentar deletar a chave!");
        }
    });
  }

  deleteValue(param){
    return this.http.delete(this.baseUrl+this.serverParam+'/'+this.dbSelected+'/deleteValue/'+param.type+'/'+param.key+'/'+param.item).subscribe( res => {
        if( res ){
           this.getKeyInfo(param.key, this.dbSelected ).subscribe( res => {
               this.returnControl( 'keyInfo' , res , "Ocorreu um erro ao tentar recarregar informações da chave!");
           });
        } else {
          this.returnControl( null , null , "Ocorreu um erro ao tentar deletar o item da chave!");
        }
    });
  }
}
