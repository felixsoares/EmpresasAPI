# CompanyAPI

API criada para o teste da Ioasys.

### Instalação

Para instalar e deixar a API rodando é muito simples :) so precisa de três comandos...

```
git clone https://github.com/felixsoares/EmpresasAPI.git
cd empresas
npm start
```

Pronto,
API estará rodando em http://localhost:3000/

## Rotas presentes na API

| ROTAS                                    | VERBOS | PARÂMETROS                                                                                                      | OBJETIVO                                                         |
|------------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| /api/v1/users/auth/sign_in               | POST   | {"email": "meu@email.com", "password": "minhaSenha"}                                                            | Rota usada para login do usuário                                 |
| /api/v1/enterprises                      | GET    | ?name=NomeDaEmpresa                                                                                             | Rota usada para pesquisar empresas                               |
| /api/v1/enterprises/{id}                 | GET    | -                                                                                                               | Rota usada para buscar as informações de uma empresa             |
