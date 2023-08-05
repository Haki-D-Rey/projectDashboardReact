import React, { FC, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from 'primereact/button';

import { BiReset } from 'react-icons/bi';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

interface IOrganigramProps {}

interface ITreeNode {
  expanded: boolean;
  data: {
    name: string;
    level: number;
    type: string;
  };
  children: ITreeNode[];
}

const Organigram: FC<IOrganigramProps> = ({}) => {
  const [selection, setSelection] = useState<ITreeNode[]>([]);
  const [data] = useState<ITreeNode[]>([
    {
      expanded: true,
      data: {
        name: 'Walter White',
        level: 10,
        type: 'Admin',
      },
      children: [
        {
          expanded: true,
          data: {
            name: 'Jesse Pinkman',
            level: 9,
            type: 'Admin',
          },
          children: [
            {
              expanded: true,
              data: {
                name: 'Jesse Pinkman',
                level: 9,
                type: 'Admin',
              },
              children: [],
            },
            {
              expanded: true,
              data: {
                name: 'Skyler White',
                level: 9,
                type: 'Admin',
              },
              children: [
                {
                  expanded: true,
                  data: {
                    name: 'Jesse Pinkman',
                    level: 9,
                    type: 'Admin',
                  },
                  children: [],
                },
                {
                  expanded: true,
                  data: {
                    name: 'Skyler White',
                    level: 9,
                    type: 'Admin',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          expanded: true,
          data: {
            name: 'Skyler White',
            level: 9,
            type: 'Admin',
          },
          children: [
            {
              expanded: true,
              data: {
                name: 'Jesse Pinkman',
                level: 9,
                type: 'Admin',
              },
              children: [],
            },
            {
              expanded: true,
              data: {
                name: 'Skyler White',
                level: 9,
                type: 'Admin',
              },
              children: [
                {
                  expanded: true,
                  data: {
                    name: 'Jesse Pinkman',
                    level: 9,
                    type: 'Admin',
                  },
                  children: [],
                },
                {
                  expanded: true,
                  data: {
                    name: 'Skyler White',
                    level: 9,
                    type: 'Admin',
                  },
                  children: [
                    {
                      expanded: true,
                      data: {
                        name: 'Jesse Pinkman',
                        level: 9,
                        type: 'Admin',
                      },
                      children: [],
                    },
                    {
                      expanded: true,
                      data: {
                        name: 'Skyler White',
                        level: 9,
                        type: 'Admin',
                      },
                      children: [],
                    },
                    {
                      expanded: true,
                      data: {
                        name: 'Jesse Pinkman',
                        level: 9,
                        type: 'Admin',
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const nodeTemplate = (node: ITreeNode) => {
    return (
      <div className="flex flex-col text-xs">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p>{node.data.name}</p>
          <p>
            <span className="font-bold">Nivel:</span> {node.data.level}
          </p>
          <p>
            <span className="font-bold">Tipo de Cuenta:</span> {node.data.type}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex-1 rounded-xl bg-secondary">
      <div className="absolute inset-0 overflow-hidden p-4">
        <TransformWrapper limitToBounds={false}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools fixed bottom-10 right-10 z-50 m-1 flex flex-col gap-2">
                <Button
                  severity="secondary"
                  style={{ backgroundColor: '#112138' }}
                  onClick={() => resetTransform()}
                  icon={<BiReset className="text-lg" />}
                />
                <Button
                  severity="secondary"
                  style={{ backgroundColor: '#112138' }}
                  onClick={() => zoomIn()}
                  icon={<AiOutlineZoomIn className="text-lg" />}
                />
                <Button
                  severity="secondary"
                  style={{ backgroundColor: '#112138' }}
                  onClick={() => zoomOut()}
                  icon={<AiOutlineZoomOut className="text-lg" />}
                />
              </div>

              <TransformComponent>
                <OrganizationChart value={data} selectionMode="multiple" selection={selection} nodeTemplate={nodeTemplate} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Organigram;
