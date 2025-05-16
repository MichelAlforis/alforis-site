const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) return walk(fp, callback);
    if (fp.endsWith('.js') || fp.endsWith('.jsx') || fp.endsWith('.tsx')) callback(fp);
  });
}

walk('./', file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('useSearchParams')) {
    if (!content.trim().startsWith("'use client'") && !content.trim().startsWith('"use client"')) {
      console.log('❌', file, 'utilise useSearchParams sans "use client" en haut');
    } else {
      console.log('✅', file, 'est OK');
    }
  }
});
