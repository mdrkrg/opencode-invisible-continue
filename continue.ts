import type { Plugin } from "@opencode-ai/plugin"
import { applyInvisibleContinue, registerContinueCommand } from "./src/index.ts"

export default (async () => ({
  config: async (config) => {
    registerContinueCommand(config)
  },
  "command.execute.before": async (input, output) => {
    applyInvisibleContinue(input, output)
  },
})) satisfies Plugin
