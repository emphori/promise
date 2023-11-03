# Promise

A strongly typed drop-in replacement for Promises in TypeScript.


## Features

* **Type-safe rejections** greatly improve how errors are surfaced, and makes
  handling them an absolute joy.

* **A simplified `.then` type signature** that disallows inline rejection
  handling in favour of explict calls to `.catch` when required.

* **Incrementally adoptable** and backwards compatible with the weakly typed
  Promises shipped with TypeScript.


## Installation

Promise is available from the NPM registry and as a GitHub Package. Whichever
source you prefer to use, the installation instructions should remain the same.

```sh
# Using NPM
npm install @emphori/promise -S

# Or, using Yarn
yarn add @emphori/promise
```


## Examples

```ts
import { Promise } from '@emphori/promise'

// (userId: string) => Promise<User, UserNotFound>
function getUser(userId: string): Promise<User, UserNotFound> {
  return User.getById(userId).then((user) => {
    return user ?? Promise.reject(UserNotFound)
  })
}
```

## Licence

This project is released under the [MIT License][license]. Enjoy responsibly ❤️

[license]: https://github.com/emphori/promise/blob/HEAD/LICENSE
