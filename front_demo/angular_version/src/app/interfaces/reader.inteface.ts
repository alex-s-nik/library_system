import { type LendingFact } from './lenging-fact.inteface';
export interface Reader {
  id: number
  name: string
  card: string
  lendingFacts: LendingFact[]
}
