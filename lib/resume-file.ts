import { statSync } from 'node:fs'
import path from 'node:path'

import { profile } from './resume'

/**
 * Size of the CV PDF, read from disk at build time so the label on the
 * download button can never drift from the file actually served.
 */
export function getResumeSize() {
  try {
    const file = path.join(process.cwd(), 'public', profile.resumeUrl)
    const bytes = statSync(file).size
    return bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`
  } catch {
    return undefined
  }
}
