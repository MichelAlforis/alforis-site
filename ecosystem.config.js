module.exports = {
  apps: [
    {
      name: "alforis-site",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 0.0.0.0",
      cwd: "/root/alforis",
      env: { NODE_ENV: "production" },
      autorestart: true,
      max_restarts: 10,
      watch: false
    }
  ]
}
