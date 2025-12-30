import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export function CredentialManagementDemo() {
  const [isSupported] = useState('credentials' in navigator)
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Demo 1: Password credentials
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [storedCredential, setStoredCredential] = useState<string | null>(null)

  // Demo 2: Federated credentials
  const [email, setEmail] = useState('')
  const [provider, setProvider] = useState('https://accounts.google.com')

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Store password credential
  const storePasswordCredential = useCallback(async () => {
    if (!navigator.credentials) return

    if (!username || !password) {
      addLog('Please enter both username and password', 'error')
      return
    }

    try {
      const credential = new PasswordCredential({
        id: username,
        password: password,
        name: username,
      })

      await navigator.credentials.store(credential)
      setStoredCredential(username)
      addLog(`Password credential stored for: ${username}`, 'success')
      addLog('Credential will be available for auto-fill', 'info')
    } catch (error) {
      addLog(`Failed to store credential: ${(error as Error).message}`, 'error')
    }
  }, [username, password, addLog])

  // Get password credential
  const getPasswordCredential = useCallback(async () => {
    if (!navigator.credentials) return

    try {
      const credential = await navigator.credentials.get({
        password: true,
        mediation: 'optional'
      }) as PasswordCredential | null

      if (credential && credential.type === 'password') {
        setUsername(credential.id)
        setPassword(credential.password || '')
        setStoredCredential(credential.id)
        addLog(`Retrieved credential for: ${credential.id}`, 'success')
        if (credential.name) {
          addLog(`Display name: ${credential.name}`, 'info')
        }
      } else {
        addLog('No stored credentials found', 'info')
      }
    } catch (error) {
      addLog(`Failed to get credential: ${(error as Error).message}`, 'error')
    }
  }, [addLog])

  // Store federated credential
  const storeFederatedCredential = useCallback(async () => {
    if (!navigator.credentials) return

    if (!email || !provider) {
      addLog('Please enter email and provider', 'error')
      return
    }

    try {
      const credential = new FederatedCredential({
        id: email,
        provider: provider,
        name: email,
      })

      await navigator.credentials.store(credential)
      addLog(`Federated credential stored for: ${email}`, 'success')
      addLog(`Provider: ${provider}`, 'info')
    } catch (error) {
      addLog(`Failed to store federated credential: ${(error as Error).message}`, 'error')
    }
  }, [email, provider, addLog])

  // Get federated credential
  const getFederatedCredential = useCallback(async () => {
    if (!navigator.credentials) return

    try {
      const credential = await navigator.credentials.get({
        federated: {
          providers: [
            'https://accounts.google.com',
            'https://www.facebook.com',
            'https://github.com'
          ]
        },
        mediation: 'optional'
      }) as FederatedCredential | null

      if (credential && credential.type === 'federated') {
        setEmail(credential.id)
        setProvider(credential.provider)
        addLog(`Retrieved federated credential for: ${credential.id}`, 'success')
        addLog(`Provider: ${credential.provider}`, 'info')
      } else {
        addLog('No federated credentials found', 'info')
      }
    } catch (error) {
      addLog(`Failed to get federated credential: ${(error as Error).message}`, 'error')
    }
  }, [addLog])

  // Prevent silent access
  const preventSilentAccess = useCallback(async () => {
    if (!navigator.credentials) return

    try {
      await navigator.credentials.preventSilentAccess()
      addLog('Silent access prevented', 'success')
      addLog('User will be prompted on next sign-in', 'info')
    } catch (error) {
      addLog(`Failed to prevent silent access: ${(error as Error).message}`, 'error')
    }
  }, [addLog])

  // Create credential (simulated)
  const createPublicKeyCredential = useCallback(async () => {
    if (!navigator.credentials) return

    addLog('WebAuthn demo - This requires user interaction', 'info')

    try {
      // This is a simplified example - real WebAuthn requires server challenge
      const publicKeyOptions: PublicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: {
          name: 'Web Playground',
          id: window.location.hostname
        },
        user: {
          id: new Uint8Array(16),
          name: username || 'demo@example.com',
          displayName: username || 'Demo User'
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 },  // ES256
          { type: 'public-key', alg: -257 } // RS256
        ],
        timeout: 60000,
        attestation: 'none'
      }

      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions
      })

      if (credential) {
        addLog('WebAuthn credential created successfully', 'success')
        addLog('This would typically be sent to server', 'info')
      }
    } catch (error) {
      if ((error as Error).name === 'NotAllowedError') {
        addLog('User cancelled or operation not allowed', 'warning')
      } else {
        addLog(`WebAuthn failed: ${(error as Error).message}`, 'error')
      }
    }
  }, [username, addLog])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Credential Management API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Credential Management API is available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 51+</li>
              <li>Firefox 60+</li>
              <li>Safari 13+ (partial support)</li>
              <li>Opera 38+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: Some features may require HTTPS and user interaction.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Password Credentials */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>1. Password Credentials</CardTitle>
          <CardDescription>
            Store and retrieve username/password credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={storePasswordCredential} className="flex-1">
              Store Credential
            </Button>
            <Button onClick={getPasswordCredential} variant="outline" className="flex-1">
              Get Stored Credential
            </Button>
          </div>

          {storedCredential && (
            <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
              ✓ Credential stored for: <strong>{storedCredential}</strong>
              <br />
              <span className="text-muted-foreground">
                This credential can now be used for auto-fill
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo 2: Federated Credentials */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>2. Federated Credentials</CardTitle>
          <CardDescription>
            Store and retrieve OAuth/OpenID credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email/Username:
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Identity Provider:
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="https://accounts.google.com">Google</option>
                <option value="https://www.facebook.com">Facebook</option>
                <option value="https://github.com">GitHub</option>
                <option value="https://twitter.com">Twitter</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={storeFederatedCredential} className="flex-1">
              Store Federated Credential
            </Button>
            <Button onClick={getFederatedCredential} variant="outline" className="flex-1">
              Get Federated Credential
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Note:</strong> Federated credentials store the identity provider information.
            The actual authentication still happens through the provider's OAuth flow.
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: WebAuthn */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. WebAuthn (Public Key Credentials)</CardTitle>
          <CardDescription>
            Biometric and hardware key authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
            <strong>⚠ Requirements:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>HTTPS connection (or localhost)</li>
              <li>User gesture/interaction required</li>
              <li>Compatible authenticator device</li>
            </ul>
          </div>

          <Button onClick={createPublicKeyCredential} className="w-full">
            Create WebAuthn Credential
          </Button>

          <div className="bg-muted p-4 rounded-lg text-xs space-y-2">
            <p className="font-semibold">WebAuthn supports:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Fingerprint scanners</li>
              <li>Face recognition (Face ID, Windows Hello)</li>
              <li>Hardware security keys (YubiKey, etc.)</li>
              <li>Platform authenticators (Touch ID, etc.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Demo 4: API Controls */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>4. Credential Management Controls</CardTitle>
          <CardDescription>
            Control credential behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={preventSilentAccess} variant="outline" className="w-full">
              Prevent Silent Access
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              After logout, this prevents automatic sign-in on the next visit.
              User will be prompted to choose an account.
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg text-xs space-y-2">
            <p className="font-semibold">Mediation Options:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="bg-background px-1 rounded">silent</code> - Automatic sign-in without UI</li>
              <li><code className="bg-background px-1 rounded">optional</code> - Show UI if needed</li>
              <li><code className="bg-background px-1 rounded">required</code> - Always show account chooser</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of credential operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try storing or retrieving credentials.
              </p>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'error' ? 'text-red-500' :
                  log.type === 'warning' ? 'text-orange-500' :
                  log.type === 'success' ? 'text-green-500' :
                  'text-foreground'
                }`}
              >
                <span className="text-muted-foreground">[{log.timestamp}]</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
