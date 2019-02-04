# M.Redis admin
## Sobre
O M.Redis admin é pequeno administrador para bancos de dados Redis escrito em PHP e Angular 6 .

## Instalação e configurações
Para instalar execute os seguintes comandos copiando os arquivos para o seu servidor e baixando as dependências necessárias:

```
$ git clone https://github.com/mariolucas/M.Redis-Admin.git
$ cd M.Redis-Admin/web/core
$ composer install
```
M.Redis Admin já está configurado para se conectar a instalação Redis local, mas, caso deseje inserir novas conexões acesse a pasta de configurações **m.redis/web/core/config/** e edite o arquivo **serversConfig.php**: 

### Usando Docker

Se tiver o Docker instalado em seu servidor, execute o seguinte comando na raiz da aplicação:

```
$ docker-composer up -d
```
A aplicação irá rodar em http://localhost e http://api.localhost para acesso a API.
Para alterar os dominios edite o arquivo **web/docker/server/vhost.conf**.

**Obs**.: *Não esqueça antes de criar os dominios no arquivo de hosts do seus sistema operacional.* 

### Usando Apache

No apache você deverá criar dois virtualhosts:

O primeiro apontando para a pasta **/web/public/dist**:
```
<VirtualHost *:80>
	ServerName mredisadmin
    DocumentRoot /web/public/dist
    <Directory "/web/public/dist">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```
O segundo para a pasta **/web/core/router**, com o subdominio **api.**, veja o exemplo:
```
<VirtualHost *:80>
	ServerName api.mredisadmin
    DocumentRoot /web/core/router
    <Directory "/web/core/router">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```