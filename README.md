<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1dllBZ0rq3YQ1XeXhc9zx3fSDvA1tg0CW

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

要在本地部署和运行这个 React + TypeScript + Gemini API 的项目，最简单且现代化的方法是使用 **Vite**。

因为你的代码中使用了 .tsx (JSX/TypeScript) 语法，浏览器无法直接运行，必须经过编译。

请按照以下步骤操作：

### 1. 环境准备

确保你的电脑上安装了 **Node.js** (建议版本 v18 或更高)。

### 2. 初始化项目

打开终端（命令行），运行以下命令创建一个新的 Vite 项目：

codeBash

```
# 创建名为 lingoflow 的项目，使用 React + TypeScript 模板
npm create vite@latest lingoflow -- --template react-ts

# 进入目录
cd lingoflow

# 安装依赖
npm install
```

### 3. 安装必要的库

根据你的代码，你需要安装以下依赖包：

codeBash

```
npm install @google/genai lucide-react react-markdown
```

### 4. 迁移文件

将你现有的代码文件复制到 lingoflow 文件夹中。请严格按照以下结构放置文件：

- **index.html** -> 替换项目根目录下的 index.html
- **src/** 文件夹内：
  - index.tsx (注意：Vite 默认入口通常叫 main.tsx，请将你的 index.tsx 重命名为 main.tsx，或者修改 index.html 中的引用)
  - App.tsx
  - types.ts
  - metadata.json
  - 创建一个 components 文件夹，放入 SidebarLeft.tsx, SidebarRight.tsx, ChatArea.tsx, MessageBubble.tsx
  - 创建一个 services 文件夹，放入 geminiService.ts

### 5. 关键配置：API Key 与 环境变量

你的代码使用了 process.env.API_KEY。在浏览器环境中，process 对象默认是不存在的。我们需要配置 Vite 来注入它。

**第一步：创建 .env 文件**
在项目根目录（与 package.json 同级）创建一个名为 .env 的文件，填入你的 Google Gemini API Key：

codeEnv

```
API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**第二步：修改 vite.config.ts**
修改根目录下的 vite.config.ts，使其能够读取 .env 文件并将 API_KEY 注入到代码中。

codeTypeScript

```
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 这行代码让你的前端代码可以使用 process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  }
})
```

### 6. 修正 index.html

打开根目录下的 index.html。

1. 保留你的 Tailwind CDN <script src="https://cdn.tailwindcss.com"></script>。
2. **删除** <script type="importmap">...</script> 部分（因为我们现在使用 npm 管理依赖，不再需要 CDN importmap）。
3. 确保 <body> 里的脚本引用指向正确的文件（Vite 默认是 /src/main.tsx，如果你的文件叫 index.tsx，请修改路径）。

codeHtml

```
<!-- 修改引用路径以匹配你的文件名 -->
<script type="module" src="/src/index.tsx"></script>
```

### 7. 启动项目

在终端运行：

codeBash

```
npm run dev
```

终端会显示一个地址（通常是 http://localhost:5173），在浏览器中打开该地址即可使用。

------



### 常见问题排查

1. **"process is not defined"**: 确保你按照第 5 步正确配置了 vite.config.ts。
2. **404 Not Found (News)**: 本地运行时，如果你没有科学上网环境，Gemini API 可能会连接超时或失败。
3. **Import 错误**: 检查 components 和 services 文件夹内的引用路径是否正确（例如 ../types）。
