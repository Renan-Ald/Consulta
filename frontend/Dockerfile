# Usando uma imagem base do Node.js
FROM node:18

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto
COPY package*.json ./
COPY . .

# Instalando as dependências
RUN npm install

# Expondo a porta que o aplicativo vai usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
