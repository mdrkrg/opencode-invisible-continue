import type { Plugin } from "@opencode-ai/plugin"
import { applyInvisibleContinue, registerContinueCommand } from "./src/index.ts"

const invisibleContinue: Plugin = async () => {
  let ownsCommand = false

  return {
    config: async (config) => {
      ownsCommand = registerContinueCommand(config)
    },
    "command.execute.before": async (input, output) => {
      if (!ownsCommand) return
      applyInvisibleContinue(input, output)
    },
  }
}

export default invisibleContinue
