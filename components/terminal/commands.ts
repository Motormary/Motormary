import { cmdHelp } from './data'

type Commands = {
  help: () => string
}

export const commandList = (cmd: string) => {
  switch (cmd) {
    case 'help':
      return cmdHelp
  }
}
