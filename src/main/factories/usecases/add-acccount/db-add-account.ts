import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAddAccountUseCase = (): AddAccount => {
  const hashSalts = 12
  const bcryptAdapter = new BcryptAdapter(hashSalts)
  const addAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, addAccountRepository, addAccountRepository)
}
