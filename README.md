# M.Redis admin
## Sobre
O M.Redis admin é pequeno administrador para bancos de dados Redis escrito em PHP e Angular 6 .

## Instalação e configurações
Para instalar execute os seguintes comandos:

Copie os arquivos para o seu servidor:

```
$ git clone https://github.com/mariolucas/m.redis.git
```
Acesse a pasta de configurações **m.redis/web/core/config/** e edite o arquivo **serversConfig.php** alterando ou incluindo novos dados de conexão: 

```php
$data = '{
	"servers":[
		{
			"name":"Localhost",
			"host":"redis",
			"port":6379,
			"timeout":0,
			"persistent_id":null,
			"pass":null
		}
	]
}';
```
### Usando Docker

Se você tiver o Docker instalado em seu servidor, execute os comandos:

```
$ cd m.redis
$ docker-composer up -d
```
A aplicação irá rodar em http://localhost e http://api.localhost.
Para alterar os dominios edite o arquivo **web/docker/server/vhost.conf**.

**Obs**.: *Não esqueça antes de criar os dominios no arquivo de hosts do seu sistema operacional.* 

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