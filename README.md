# remark-lint-smarty-pants-typography

[remark-lint](https://github.com/remarkjs/remark-lint) plugin to ensure that your Markdown use curved quotes, apostrophes and hyphens/dashes.

## Install

```sh
npm install remark-lint-smarty-pants-typography
```

## Usage

Use like any other [remark-lint](https://github.com/remarkjs/remark-lint) plugin.
Check out the [remark-lint](https://github.com/remarkjs/remark-lint) documentation for details.

**Some additional point to note:**

The plugin formats the processed file if the flag  `--output` **is not set**. If you use this flag for general formatting of your documents, better use the plugin [remark-smartypants](https://github.com/silvenon/remark-smartypants)

## Options

Under the hood the plugin uses [retext-smartypants](https://github.com/retextjs/retext-smartypants).
Check out the [retext-smartypants options](https://github.com/retextjs/retext-smartypants/tree/main?tab=readme-ov-file#options) for details.

## Examples

When this rule is turned on, the content of the following `example.md`:

```md
He said, "A 'simple' english sentence..."

It's will be held from June 1-5. The statement -- if you ask me --- is quite remarkable...
```

Will be converted to the following content of `example.md`:

```md
He said, “A ‘simple’ english sentence…”

It’s will be held from June 1-5. The statement – if you ask me — is quite remarkable…
```

```text
         warning File has been overwritten    smarty-pants-typography remark-lint

3:1-3:42 warning Smart typography was applied smarty-pants-typography remark-lint

5:1-5:91 warning Smart typography was applied smarty-pants-typography remark-lint
```
