import { describe, expect, test } from "bun:test"
import {
  CONTINUE_COMMAND,
  CONTINUE_MARKER,
  applyInvisibleContinue,
  invisibleContinuePart,
} from "../src/index.ts"

describe("applyInvisibleContinue", () => {
  test("replaces every part of the continue command in place", () => {
    const parts = [
      { type: "text", text: "resolved template" },
      { type: "file", url: "file:///tmp/example.ts" },
    ]
    const output = { parts }
    expect(applyInvisibleContinue({ command: CONTINUE_COMMAND }, output)).toBe(true)
    expect(output.parts).toBe(parts)
    expect(parts).toEqual([invisibleContinuePart()])
  })

  test("leaves other commands untouched", () => {
    const parts = [{ type: "text", text: "other template" }]
    expect(applyInvisibleContinue({ command: "other" }, { parts })).toBe(false)
    expect(parts).toEqual([{ type: "text", text: "other template" }])
  })
})

describe("the hidden continuation part", () => {
  test("carries the invisibility flags and marker", () => {
    const part = invisibleContinuePart()
    expect(part.text).toBe("")
    expect(part.synthetic).toBe(true)
    expect(part.ignored).toBe(true)
    expect(part.metadata[CONTINUE_MARKER]).toBe(true)
  })
})
