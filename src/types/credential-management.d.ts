// Credential Management API types

interface PasswordCredentialData {
  id: string
  password: string
  name?: string
  iconURL?: string
}

interface FederatedCredentialData {
  id: string
  provider: string
  name?: string
  iconURL?: string
}

declare global {
  class PasswordCredential extends Credential {
    readonly password: string | null
    readonly name: string | null
    readonly iconURL: string | null
    constructor(data: PasswordCredentialData | HTMLFormElement)
  }

  class FederatedCredential extends Credential {
    readonly provider: string
    readonly name: string | null
    readonly iconURL: string | null
    readonly protocol: string | null
    constructor(data: FederatedCredentialData)
  }

  interface CredentialRequestOptions {
    password?: boolean
    federated?: {
      providers?: string[]
      protocols?: string[]
    }
    mediation?: 'silent' | 'optional' | 'required'
    signal?: AbortSignal
  }

  interface CredentialsContainer {
    get(options?: CredentialRequestOptions): Promise<Credential | null>
    store(credential: Credential): Promise<Credential>
    create(options?: CredentialCreationOptions): Promise<Credential | null>
    preventSilentAccess(): Promise<void>
  }

  interface Navigator {
    credentials: CredentialsContainer
  }
}

export {}
