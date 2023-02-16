import { ApiContext, User } from "../types/data"
import { fetcher } from "../utils"

export type SigninParams = {
  username: string
  password: string
}

const signin = async (
  context: ApiContext,
  params: SigninParams
): Promise<User> => {
  return await fetcher(
    // この正規表現は末尾にある「/」の全てを消すの意味
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  )
}

export default signin