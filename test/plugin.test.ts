import { describe, expect, test } from "bun:test"
import type { PluginInput } from "@opencode-ai/plugin"
import plugin from "../continue.ts"
import {
  CONTINUE_COMMAND,
  CONTINUE_COMMAND_DESCRIPTION,
  invisibleContinuePart,
} from "../src/index.ts"

const input = {} as PluginInput

describe("continue plugin", () => {
  test("registers the continue command from the config hook", async () => {
    const hooks = await plugin(input)
    const config = { command: {} as Record<string, { template: string; description?: string }> }
    await hooks.config?.(config as never)
    expect(config.command[CONTINUE_COMMAND]).toEqual({
      description: CONTINUE_COMMAND_DESCRIPTION,
      template: "",
    })
  })

  test("hides the prompt parts of the continue command", async () => {
    const hooks = await plugin(input)
    const parts: unknown[] = [{ type: "text", text: "resolved template" }]
    await hooks["command.execute.before"]?.(
      { command: CONTINUE_COMMAND, sessionID: "session", arguments: "" },
      { parts } as never,
    )
    expect(parts).toEqual([invisibleContinuePart()])
  })
})
