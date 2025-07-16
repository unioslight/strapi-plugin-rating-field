import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import RatingFieldIcon from "./components/RatingFieldIcon";
import pluginId from "./pluginId";
import getTrad from "./utils/getTrad";

export default {
  register(app) {
    app.customFields.register({
      name: pluginPkg.strapi.name,
      type: "integer",
      icon: RatingFieldIcon,
      intlLabel: {
        id: getTrad("label"),
        defaultMessage: "Rating",
      },
      intlDescription: {
        id: getTrad("description"),
        defaultMessage: "Display a rating field with stars",
      },
      components: {
        Input: async () => await import("./components/RatingField"),
      },
      options: {
        base: [],
        advanced: [
          {
            name: "required",
            type: "checkbox",
            intlLabel: {
              id: getTrad("options.advanced.required"),
              defaultMessage: "Required field",
            },
            description: {
              id: getTrad("options.advanced.required.description"),
              defaultMessage:
                "You won't be able to create an entry if this field is empty",
            },
          },
        ],
      },
    });
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
