# Promise

A strongly typed drop-in replacement for Promises in TypeScript.


## Features

* **Type-safe rejections** greatly improve how errors are surfaced, and makes
  handling them an absolute joy.

* **A simplified `.then` type signature** that disallows inline rejection
  handling in favour of explict calls to `.catch` when required.


## Installation

Promise is available through both NPM and GitHub Packages. Whichever registry
you prefer to use, the installation instructions should remain the same.

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
