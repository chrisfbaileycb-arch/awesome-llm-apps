const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure port 3000 is not held by any orphaned process
try {
  execSync('pkill -f "next dev" || true', { stdio: 'ignore' });
} catch (e) {}

const clientDir = path.resolve(
  __dirname,
  'advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/client'
);

function findNextBin() {
  // 1. Try require.resolve
  try {
    return require.resolve('next/dist/bin/next', {
      paths: [process.cwd(), clientDir],
    });
  } catch (e) {}

  // 2. Try standard bin paths
  const candidatePaths = [
    path.join(clientDir, 'node_modules/.bin/next'),
    path.join(__dirname, 'node_modules/.bin/next'),
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) return p;
  }

  // 3. Scan node_modules as fallback
  try {
    const stdout = execSync('find node_modules -path "*/dist/bin/next" 2>/dev/null', {
      encoding: 'utf-8',
    }).trim();
    const firstMatch = stdout.split('\n').filter(Boolean)[0];
    if (firstMatch && fs.existsSync(firstMatch)) {
      return path.resolve(firstMatch);
    }
  } catch (e) {}

  return null;
}

let nextBin = findNextBin();

if (!nextBin) {
  console.log('[start-dev] Next binary not found, ensuring dependencies...');
  try {
    execSync('npm install --legacy-peer-deps', {
      stdio: 'inherit',
    });
    nextBin = findNextBin();
  } catch (err) {
    console.error('[start-dev] Install error:', err);
  }
}

if (!nextBin) {
  console.error('[start-dev] Fatal: could not locate next binary');
  process.exit(1);
}

console.log('[start-dev] Starting Next.js dev server with:', nextBin);

const child = spawn(process.execPath, [nextBin, 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  cwd: clientDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '3000',
    HOST: '0.0.0.0',
  },
});

function shutdown() {
  if (child && !child.killed) {
    try {
      child.kill('SIGTERM');
    } catch (e) {}
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);
process.on('exit', shutdown);

child.on('exit', (code, signal) => {
  if (signal) {
    process.exit(0);
  } else {
    process.exit(code ?? 0);
  }
});
