import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import * as Sentry from "@sentry/browser";
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
      tracesSampleRate: setting.get('tracesSampleRate').composite as number,
    });
  }
};

export default plugin;
