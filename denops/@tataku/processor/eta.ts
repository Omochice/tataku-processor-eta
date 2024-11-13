import { Denops } from "jsr:@denops/std@7.3.2";
import { Eta } from "jsr:@eta-dev/eta@3.5.0";
import * as vars from "jsr:@denops/std@7.3.2/variable";
import { assert, ensure, is } from "jsr:@core/unknownutil@4.3.0";

const isDirectOption = is.ObjectOf({
  type: is.LiteralOf("direct"),
  template: is.String,
});

const isFileOption = is.ObjectOf({
  type: is.LiteralOf("file"),
  templateDirectory: is.String,
  templateFileName: is.String,
});

const isOption = is.UnionOf([isDirectOption, isFileOption]);

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
