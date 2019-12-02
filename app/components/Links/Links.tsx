'use strict'

import * as React from 'react'
import { Card, CardTitle, CardText, Button, CardActions } from 'react-md'
import { observer } from 'mobx-react'

import { LinksStore, connect, connectObserved } from '../../stores'
import TopologicalOutput from './TopologicalOutput'

import './Links.scss'

interface InjectedLinksProps {
  generateLinks(): void
  clearAll(): void
  linksData: LinksStore['linksData']
}

interface LinkProps {
  data: string
}

const Links: React.SFC<InjectedLinksProps & LinkProps> = props => {
  const { generateLinks, linksData, clearAll } = props

  return (
    <Card className="Links">
      <CardTitle title="Arestas e Relações" />
      <CardText>
        <ol className="links-list scrollable-thumb">
          {linksData.map((item, i) => getFunctionCallerItem(item, i))}
        </ol>
      </CardText>
      <CardText>
        <TopologicalOutput data={new Date().toLocaleTimeString()} />
        <div>
          <b>
            Links OwnProps from app.localTime via Application (not observed):{' '}
          </b>
          <div>{props.data}</div>
        </div>
      </CardText>
      <CardActions>
        <Button raised primary onClick={clearAll}>
          @a Clear All
        </Button>
        <Button
          className="generate-links-btn"
          onClick={generateLinks}
          raised
          primary
        >
          gerar grafo
        </Button>
      </CardActions>
    </Card>
  )
}

// export default connect<InjectedLinksProps, LinkProps>((stores, ownProps) => {
//     return {
//         topologicalOutput: stores.linksStore.topologicalOutput,
//         linksData: stores.linksStore.linksData,
//         generateLinks: () => stores.linksStore.generateLinks(),
//         clearAll: () => stores.linksStore.clearAll(),
//         data: ownProps.data
//     }
// })(Links);

export default connectObserved<InjectedLinksProps, LinkProps>(
  (stores, ownProps) => {
    return {
      linksData: stores.linksStore.linksData,
      generateLinks: () => stores.linksStore.generateLinks(),
      clearAll: () => stores.linksStore.clearAll(),
      data: ownProps.data
    }
  }
)(Links)

function getFunctionCallerItem(links, idx) {
  return <li key={idx}>{links.join(' - ')}</li>
}
