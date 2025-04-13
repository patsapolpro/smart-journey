import { FC, ReactElement } from 'react'
import combineProviders from '@/utils/combineProvider'
import { ReactFlowProvider } from 'react-flow-renderer';
import { CollapseProvider } from '@/contexts/collapsed/CollapsedContext'

interface IProvider {
  children: ReactElement
}

const providers: FC<any>[] = [
  CollapseProvider,
  ReactFlowProvider,
]

const Providers: FC<IProvider> = ({ children }) => {
  return combineProviders({ children, providers })
}

export default Providers
