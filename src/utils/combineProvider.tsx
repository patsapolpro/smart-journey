import { FC, ReactElement } from 'react'

interface ICombineProviders {
  children: ReactElement
  providers: FC<any>[]
}

const combineProvider = ({ providers, children }: ICombineProviders) => {
  return providers.reduceRight((accum, Provider) => {
    return <Provider>{accum}</Provider>
  }, children)
}

export default combineProvider
