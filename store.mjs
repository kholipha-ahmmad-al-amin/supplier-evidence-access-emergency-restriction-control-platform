import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
export class AtomicJsonStore {
  constructor(filePath) { this.filePath = filePath; }
  read() { try { const snapshot = JSON.parse(readFileSync(this.filePath, 'utf8')); return { restrictions: Array.isArray(snapshot.restrictions) ? snapshot.restrictions : [] }; } catch (error) { if (error.code === 'ENOENT') return { restrictions: [] }; throw error; } }
  write(snapshot) { mkdirSync(dirname(this.filePath), { recursive: true }); const temporaryPath = `${this.filePath}.${process.pid}.${Date.now()}.tmp`; writeFileSync(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8'); renameSync(temporaryPath, this.filePath); }
}
