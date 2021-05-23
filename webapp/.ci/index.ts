import * as aws from "@pulumi/aws"
import * as pulumi from "@pulumi/pulumi";
import { buildStatic } from 'dcl-ops-lib/buildStatic'
import { getDomainAndSubdomain } from 'dcl-ops-lib/getDomainAndSubdomain'

async function main() {
  const faucetRopsten = buildStatic({
    domain: `faucet.decentraland.io`,
    defaultPath: 'index.html',
  })

  //createAliasRecord(`faucet-goerli.decentraland.io`, { hostedZoneId: faucetRopsten.cloudfrontDistribution, domainName: faucetRopsten.cloudFrontDomain })

  return {
    cloudfrontDistribution: faucetRopsten.cloudfrontDistribution,
    bucketName: faucetRopsten.contentBucket,
  }
}
export = main
/* 
function createAliasRecord(targetDomain: string, distribution: { hostedZoneId: pulumi.Output<string>, domainName: pulumi.Output<string> }): aws.route53.Record {
  const domainParts = getDomainAndSubdomain(targetDomain)
  const hostedZoneId = aws.route53
    .getZone({ name: domainParts.parentDomain }, { async: true })
    .then((zone: { zoneId: string }) => zone.zoneId)
  return new aws.route53.Record(targetDomain, {
    name: domainParts.subdomain,
    zoneId: hostedZoneId,
    type: "CNAME",
    records: [distribution.domainName],
    ttl: 5
  })
} */