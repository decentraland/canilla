import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const faucetRopsten = buildStatic({
    domain: `faucet.decentraland.io`,
    defaultPath: 'index.html',
  })

  buildStatic({
    domain: `faucet-goerli.decentraland.io`,
    defaultPath: 'index.html',
    unprotect: true
  })

  return {
    cloudfrontDistribution: faucetRopsten.cloudfrontDistribution,
    bucketName: faucetRopsten.contentBucket,
  }
}
export = main
