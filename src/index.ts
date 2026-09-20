export const CONTINUE_COMMAND = "continue"

export const CONTINUE_COMMAND_DESCRIPTION =
  "Resume the agent loop without sending a prompt the model can read"

export const CONTINUE_MARKER = "opencode-invisible-continue"

export type CommandDefinition = {
  description?: string
  template: string
  agent?: string
  model?: string
  subtask?: boolean
}

export type CommandConfig = {
  command?: Record<string, CommandDefinition>
}

export type InvisibleContinuePart = {
  type: "text"
  text: string
  synthetic: true
  ignored: true
  metadata: Record<string, unknown>
}

export function invisibleContinuePart(): InvisibleContinuePart {
  return {
    type: "text",
    text: "",
    synthetic: true,
    ignored: true,
    metadata: { [CONTINUE_MARKER]: true },
  }
}

export function registerContinueCommand(config: CommandConfig): boolean {
  const commands = config.command ?? (config.command = {})
  if (commands[CONTINUE_COMMAND]) return false
  commands[CONTINUE_COMMAND] = {
    description: CONTINUE_COMMAND_DESCRIPTION,
    template: "",
  }
  return true
}

export function applyInvisibleContinue(
  input: { command: string },
  output: { parts: unknown[] },
): boolean {
  if (input.command !== CONTINUE_COMMAND) return false
  output.parts.splice(0, output.parts.length, invisibleContinuePart())
  return true
}
