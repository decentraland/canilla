import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const faucetRopsten = buildStatic({
    domain: `faucet.decentraland.io`,
    defaultPath: 'index.html',
  })

  buildStatic({
    domain: `goerli.faucet.decentraland.io`,
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: faucetRopsten.cloudfrontDistribution,
    bucketName: faucetRopsten.contentBucket,
  }
}
export = main
