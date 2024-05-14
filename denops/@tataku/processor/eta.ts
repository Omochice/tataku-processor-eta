import { Denops } from "https://deno.land/x/denops_std@v6.4.2/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as vars from "https://deno.land/x/denops_std@v6.4.2/variable/mod.ts";
import {
  assert,
  ensure,
  is,
} from "https://deno.land/x/unknownutil@v3.18.1/mod.ts";

const isDirectOption = is.ObjectOf({
  type: is.LiteralOf("direct"),
  template: is.String,
});

const isFileOption = is.ObjectOf({
  type: is.LiteralOf("file"),
  templateDirectory: is.String,
  templateFileName: is.String,
});

const isOption = is.OneOf([isDirectOption, isFileOption]);

const processor = (denops: Denops, option: unknown) => {
  assert(option, isOption);
  const isDirect = option.type === "direct";
  const eta = isDirect
    ? new Eta()
    : new Eta({ views: option.templateDirectory });
  const filetype = vars.lo.get(denops, "filetype");
  return new TransformStream<string[]>({
    transform: async (
      chunk: string[],
      controller: TransformStreamDefaultController<string[]>,
    ) => {
      const context = {
        content: chunk.join(""),
        ...denops.meta,
        filetype: ensure(await filetype, is.String),
      };
      const rendered = isDirect
        ? eta.renderString(option.template, context)
        : eta.render(option.templateFileName, context);
      controller.enqueue([rendered]);
    },
  });
};

export default processor;
