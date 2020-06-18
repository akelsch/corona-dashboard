export class Case {
  constructor (id, objectId, deathRate, casesPer100k, federalState, countyId, county, lastUpdate, cases7Per100k, recovered) {
    this.id = id
    this.objectId = objectId
    this.deathRate = deathRate
    this.casesPer100k = casesPer100k
    this.federalState = federalState
    this.countyId = countyId
    this.county = county
    this.lastUpdate = lastUpdate
    this.cases7Per100k = cases7Per100k
    this.recovered = recovered
  }
}
