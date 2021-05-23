import * as aws from "@pulumi/aws"
import * as pulumi from "@pulumi/pulumi";
import { buildStatic } from 'dcl-ops-lib/buildStatic'
import { getDomainAndSubdomain } from 'dcl-ops-lib/getDomainAndSubdomain'

async function main() {
  const faucetRopsten = buildStatic({
    domain: `faucet.decentraland.io`,
    additionalDomains: [`faucet-goerli.decentraland.io`],
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: faucetRopsten.cloudfrontDistribution,
    bucketName: faucetRopsten.contentBucket,
  }
}
export = main
