interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Adicione aqui suas variáveis customizadas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}