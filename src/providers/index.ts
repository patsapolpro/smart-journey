import { FC, ReactElement } from 'react'
import combineProviders from '@/utils/combineProvider'
import { CollapseProvider } from '@/contexts/collapsed/CollapsedContext'
import { DnDProvider } from '@/contexts/dragADrop/DragAndDropContext';
import { ReactFlowProvider } from '@xyflow/react';
import { NodeDataProvider } from '@/contexts/nodeData/NodeDataContext';

interface IProvider {
  children: ReactElement
}

const providers: FC<any>[] = [
  ReactFlowProvider,
  CollapseProvider,
  DnDProvider,
  NodeDataProvider
]

const Providers: FC<IProvider> = ({ children }) => {
  return combineProviders({ children, providers })
}

export default Providers
