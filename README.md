# tataku-processor-eta 

The processor module using eta template engine.

**CURRENTLY THIS PLUGIN IS EXPERIMENTAL**

## Contents 

- [Dependencies](tataku-processor-eta-dependencies)
- [Options](tataku-processor-eta-options)
- [Samples](tataku-processor-eta-samples)

## Dependencies 

This plugin needs:

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [tataku.vim](https://github.com/Omochice/tataku.vim)

## Options 

This module has some options.

- `type` 

  Template rendering type.
  `"direct"` use [tataku-processor-eta-options-template](tataku-processor-eta-options-template) as template string.
  `"file"` use [tataku-processor-eta-options-templateDirectory](tataku-processor-eta-options-templateDirectory) and
  [tataku-processor-eta-options-templateFileName](tataku-processor-eta-options-templateFileName) as template file.
- `template` 

  Template string.
  It use only when specify [tataku-processor-eta-options-type](tataku-processor-eta-options-type) is `"direct"`.
- `templateDirectory` 

  Path to directory that has template files.
  It use only when specify [tataku-processor-eta-options-type](tataku-processor-eta-options-type) is `"file"`.
- `templateFileName` 

  Template file name.
  It use only when specify [tataku-processor-eta-options-type](tataku-processor-eta-options-type) is `"file"`.

## Predefined variales 

When render template string, this module provide some predefined variables.

They are able to be used as `it` object.

- `content` 

  String that processed before this module.
- `fletype` 

  Filetype string of buffer that executed tataku.
- `mode` 

  Current vim type, `"vim"` or `"nvim"`.

## Samples 

```vim
let g:tataku_recipes = #{
  \   sample: #{
  \     processor: #{
  \       name: 'eta',
  \       options: #{
  \         type: 'direct',
  \         template: '<%= it.content %> <%= it.filetype =>',
  \       },
  \     }
  \   }
  \ }
```

