/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { shared as lspCommon } from '@salesforce/lightning-lsp-common';
import { ExtensionContext } from 'vscode';
import { registerLwcTestCodeLensProvider } from './codeLens/lwcTestCodeLensProvider';
import { registerCommands } from './commands';
import { registerLwcTestExplorerTreeView } from './testExplorer/testOutlineProvider';
import { lwcTestIndexer } from './testIndexer';
import { taskService } from './testRunner/taskService';
import { testResultsWatcher } from './testRunner/testResultsWatcher';
import { startWatchingEditorFocusChange } from './utils/context';
import {
  shouldActivateLwcTestSupport,
  workspaceService
} from './workspace/workspaceService';

export { shouldActivateLwcTestSupport };

export function activateLwcTestSupport(
  context: ExtensionContext,
  workspaceType: lspCommon.WorkspaceType
) {
  workspaceService.register(context, workspaceType);
  registerCommands(context);
  registerLwcTestCodeLensProvider(context);
  registerLwcTestExplorerTreeView(context);
  startWatchingEditorFocusChange(context);
  taskService.registerTaskService(context);
  testResultsWatcher.register(context);
  lwcTestIndexer.register(context);
}
