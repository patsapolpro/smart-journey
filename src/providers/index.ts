import { FC, ReactElement } from 'react'
import combineProviders from '@/utils/combineProvider'
import { CollapseProvider } from '@/contexts/collapsed/CollapsedContext'
import { DnDProvider } from '@/contexts/dragADrop/DragAndDropContext';
import { ReactFlowProvider } from '@xyflow/react';

interface IProvider {
  children: ReactElement
}

const providers: FC<any>[] = [
  ReactFlowProvider,
  CollapseProvider,
  DnDProvider,
]

const Providers: FC<IProvider> = ({ children }) => {
  return combineProviders({ children, providers })
}

export default Providers
