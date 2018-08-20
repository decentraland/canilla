export interface Locations {
  [key: string]: (...args: any[]) => string
}

export const locations: Locations = {
  root: () => '/',
  faucet: () => '/faucet'
}
