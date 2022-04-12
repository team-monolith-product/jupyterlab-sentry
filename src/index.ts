import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
/**
 * Initialization data for the jupyterlab-sentry extension.
 */
const PLUGIN_ID = 'jupyterlab-sentry:plugin';
const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry,
  ) => {
    const setting = await settingRegistry.load(PLUGIN_ID)
    Sentry.init({
      dsn: setting.get('dsn').composite as string,
      integrations: [new BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
};

export default plugin;
