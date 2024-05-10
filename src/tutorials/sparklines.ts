import * as grok from 'datagrok-api/grok';
import { filter } from 'rxjs/operators';
import { Tutorial } from '@datagrok-libraries/tutorials/src/tutorial';
import { interval } from 'rxjs';


export class SparklinesTutorial extends Tutorial {
  get name(): string {
    return 'Sparklines';
  }

  get description(): string {
    return 'Learn how to use charts to visualize numerical values within a row';
  }

  get steps(): number {
    return 3;
  }

  helpUrl: string = 'https://datagrok.ai/help/visualize/viewers/grid#summary-columns';

  protected async _run(): Promise<void> {
    this.describe('In this tutorial, we will learn how to add a column with sparklines in the grid.');
    this.header.textContent = this.name;
    const view = grok.shell.tableView(this.t!.name);
    const grid = view.grid;

    // Step 1 
    const instructionsAdd = 'Add the Sparklines column to the table';
    const descriptionAdd = 'Right click any cell and select <b>Add</b> > <b>Summary Columns</b> > <b>Sparklines</b>';

    await this.action(instructionsAdd, interval(1000).pipe(filter(() => grid.col('sparkline') != null)), null, descriptionAdd);
 
    // Step 2
    const burgerMenuElement = document.querySelector('div[column_name=""] > i.grok-icon.grok-font-icon-menu') as HTMLElement;
    const instructionsRename = 'Now, let\'s give the Sparklines column a better name.';
    const descriptionRename = '&#8226; Hover over the column\'s header and click the <b>Hamburger</b> icon.<br>' +
      '&#8226; Under <b>Actions</b>, select <b>Rename…</b>  A dialog opens.<br>' +
      '&#8226; In the dialog, enter <b>“H/W”</b> and click <b>OK</b>.';

    await this.action(instructionsRename, interval(1000).pipe(filter(() => grid.col('H/W') != null)), burgerMenuElement, descriptionRename);

    // Step 3
    const instructionsChangeCols = 'Now, let\'s change the columns selected for sparklines.';
    const descriptionChangeCols = '&#8226; On the column\'s header, click the <b>Hamburger</b> icon.<br>' +
      '&#8226; Next to <b>Columns</b>, click the dropdown and deselect the <b>AGE</b> column.'; 
    const sparklineCol = grid.col('H/W');

    await this.action(instructionsChangeCols, interval(1000).pipe(filter(() => sparklineCol?.settings.sparkline.columnNames.includes('AGE') == false)), burgerMenuElement, descriptionChangeCols);        
   
  }
}
