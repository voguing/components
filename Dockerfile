# ===== 基础镜像 =====
FROM node:20-alpine AS builder

RUN mkdir /app
WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
COPY . .

RUN npm config --global set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm i


RUN npm run docs:build

# ===== 生产环境 =====
FROM python:3.9-slim as runner

# 设置工作目录
WORKDIR /app

# 复制静态文件到工作目录
COPY --from=builder /app/docs-dist /app

EXPOSE 80

# 启动 SimpleHTTPServer
CMD ["python", "-m", "http.server", "80"]
