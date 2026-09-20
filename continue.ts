import type { Plugin } from "@opencode-ai/plugin"
import { applyInvisibleContinue, registerContinueCommand } from "./src/index.ts"

const invisibleContinue: Plugin = async () => ({
  config: async (config) => {
    registerContinueCommand(config)
  },
  "command.execute.before": async (input, output) => {
    applyInvisibleContinue(input, output)
  },
})

export default invisibleContinue
