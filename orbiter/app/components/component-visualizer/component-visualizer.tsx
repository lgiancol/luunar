import clsx from 'clsx';
import type { ThemeColour } from '~/resources/theme/constants';
import Button from '../ui/button';
import ExpansionPanel from '../ui/expansion-panel';

export default function ComponentVisualizer() {
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colours: ThemeColour[] = ['primary', 'accent', 'background', 'surface', 'muted', 'warning', 'danger'];

  const printColour = (colour: ThemeColour) => {
    console.log('Clicked: ', colour);
  };
  return (
    <>
      <div className="flex flex-col gap-3 p-5">
        <div className="rounded-lg bg-surface-300 p-4">
          <h1 className="mb-2 text-3xl font-bold">Colours</h1>
          <div className="flex flex-col gap-3">
            {colours.map((colour) => (
              <div className="flex w-full flex-col gap-1">
                <h2 className="text-2xl font-bold">{colour}</h2>
                <div className="flex gap-3">
                  {levels.map((level) => (
                    <div
                      className={clsx(
                        'flex h-[60px] flex-1 items-center justify-center rounded-md p-2',
                        `bg-${colour}-${level}`,
                        `text-${colour}-text-${level}`
                      )}
                    >
                      bg-{colour}-{level}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-surface-300 p-4">
          <h1 className="mb-2 text-3xl font-bold">Buttons</h1>
          <div className="flex gap-3">
            {colours.map((colour) => (
              <div className="flex gap-3">
                <Button colour={colour} onClick={() => printColour(colour)}>
                  Click me!
                </Button>
              </div>
            ))}
          </div>
        </div>

        <ExpansionPanel>
          <ExpansionPanel.Header>
            <h1 className="text-3xl font-bold">Buttons</h1>
          </ExpansionPanel.Header>
          <ExpansionPanel.Content>
            <div className="flex gap-3">
              {colours.map((colour) => (
                <div className="flex gap-3">
                  <Button colour={colour} onClick={() => printColour(colour)}>
                    Click me!
                  </Button>
                </div>
              ))}
            </div>
          </ExpansionPanel.Content>
        </ExpansionPanel>
      </div>
    </>
  );
}
