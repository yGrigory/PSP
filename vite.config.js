export default {
  server: {
    proxy: {
      "/stocks": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "./server/public",
    emptyOutDir: true
  }
};
