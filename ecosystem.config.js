module.exports = {
  apps: [{
    name: "alforis-site",
    script: "npm",
    args: "run start",
    env: {
      HOST: "127.0.0.1",
      PORT: "3000",
      NODE_ENV: "production"
    }
  }]
}
