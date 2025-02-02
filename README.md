# React com Bun

Este documento fornece instruções básicas para iniciar um projeto React utilizando o gerenciador de pacotes [Bun](https://bun.sh/).

## Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- [Bun](https://bun.sh/) (pode ser instalado via `curl -fsSL https://bun.sh/install | bash`)

## Criando um Novo Projeto React com Bun

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/Legisla-ai/legisla-ui-service.git
   ```

2. **Acesse a pasta do projeto:**

   ```sh
   cd legisla-ui-service
   ```

3. **Instale as dependências:**

   ```sh
   bun install
   ```

## Executando o Projeto

Para rodar o projeto em ambiente de desenvolvimento, utilize:

```sh
bun dev
```

O servidor iniciará e o projeto estará acessível normalmente em `http://localhost:5173` (ou outra porta definida).

## Build para Produção

Para gerar uma versão otimizada para produção:

```sh
bun run build
```

Os arquivos de saída serão gerados na pasta `dist/`.

## Executando o Servidor em Produção

Após construir o projeto, você pode servir os arquivos com:

```sh
bun run preview
```

## Considerações Finais

Bun é um gerenciador de pacotes rápido e eficiente, oferecendo uma alternativa moderna ao npm e yarn. Ele também pode ser usado para rodar scripts e gerenciar servidores backend em Node.js de forma mais performática.

Para mais informações, consulte a [documentação oficial do Bun](https://bun.sh/docs).
