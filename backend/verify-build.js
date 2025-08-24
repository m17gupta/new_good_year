#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Medusa build for deployment...\n');

// Check if admin build files exist
const adminBuildPath = '.medusa/client';
const indexHtmlPath = path.join(adminBuildPath, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  console.log('✅ Admin build files found at:', adminBuildPath);
  console.log('✅ index.html exists');
  
  // Check file size
  const stats = fs.statSync(indexHtmlPath);
  console.log(`✅ index.html size: ${stats.size} bytes`);
  
  // List all files in admin build directory
  const files = fs.readdirSync(adminBuildPath);
  console.log('📁 Admin build files:', files.join(', '));
  
} else {
  console.log('❌ Admin build files NOT found!');
  console.log('❌ Expected path:', path.resolve(indexHtmlPath));
  console.log('💡 Run "yarn build" to generate admin files');
  process.exit(1);
}

// Check server build
const serverBuildPath = '.medusa/server';
if (fs.existsSync(serverBuildPath)) {
  console.log('✅ Server build files found at:', serverBuildPath);
} else {
  console.log('❌ Server build files NOT found!');
  process.exit(1);
}

console.log('\n🎉 Build verification successful! Ready for deployment.');
