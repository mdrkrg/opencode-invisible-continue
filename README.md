# opencode-invisible-continue

Resume the agent loop in [opencode](https://opencode.ai) without sending the model any prompt text: `/continue` starts a normal turn whose user message is empty and hidden, so nothing new reaches the provider or the transcript.

Inspired by [pi-invisible-continue](https://github.com/monotykamary/pi-invisible-continue).

## Usage

| Command     | What it does                              |
| ----------- | ----------------------------------------- |
| `/continue` | Start or queue an invisible continuation. |

## Install

Clone the repo and point `plugin` at the entry file:

```bash
git clone https://github.com/mdrkrg/opencode-invisible-continue /path/to/opencode-invisible-continue
```

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/path/to/opencode-invisible-continue/continue.ts"]
}
```

You can also copy `continue.ts` and `src/` into `.opencode/plugin/`.

Restart opencode after changing plugins.

## How it works

`/continue` is registered with an empty template. `command.execute.before` replaces its parts with a single hidden part:

```ts
{ type: "text", text: "", synthetic: true, ignored: true, metadata: { "opencode-invisible-continue": true } }
```

opencode stores the message and runs a normal turn, but empty and `ignored` parts are skipped when provider requests are built, and `synthetic` parts are skipped by the TUI. Busy state, queued follow-ups, retries, compaction, and aborts all behave natively.

## Notes

- One hidden user message per continuation stays in the session history. It is never sent to a provider.
- If a `continue` command already exists in your config, the plugin leaves it untouched.
- In the TUI, `/continue` also matches the session-switcher alias in autocomplete; pick the registered command entry (or type `/continue` with a trailing space).
- A turn that errored is dropped from later requests; a turn aborted mid-response keeps its partial output as context.

## Development

```bash
bun install
bun test
bun run typecheck
```
