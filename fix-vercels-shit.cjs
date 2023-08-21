/* eslint-disable no-undef */

module.exports = {
  name: `fix-vercels-shit`,
  factory: (require) => {
    const { Option } = require(`clipanion`);
    const essentials = require("@yarnpkg/plugin-essentials").default;
    const AddCommand = essentials.commands.find(
      (c) =>
        c.paths?.flat().includes("add") ||
        c.paths?.flat().includes("add-original"),
    );
    const NewAddCommand = class NewAddCommand extends AddCommand {
      static paths = AddCommand.paths.slice(0);
      ignored = Option.Boolean(`--ignore-workspace-root-check`, false);
    };
    AddCommand.paths = [["add-original"]];

    return {
      commands: [NewAddCommand],
    };
  },
};
