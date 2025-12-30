import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CredentialManagementDemo } from '@/components/demos/CredentialManagementDemo'

export default function CredentialManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="credential-management-api" className="text-3xl font-bold tracking-tight">
          Credential Management API
        </h1>
        <p className="text-muted-foreground">
          Securely store and retrieve user credentials for seamless authentication
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <CredentialManagementDemo />
      </section>

      {/* What is it */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Credential Management API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Modern Authentication Management</CardTitle>
            <CardDescription>Streamline sign-in experiences across the web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Credential Management API provides a programmatic interface between the site and the browser
              for seamless sign-in flows. It enables storing and retrieving user credentials, supporting
              password-based authentication, federated identity providers, and WebAuthn (biometric/hardware keys).
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold text-sm">Key Features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Automatic sign-in with stored credentials</li>
                <li>Smart account chooser UI</li>
                <li>Password and federated credential storage</li>
                <li>WebAuthn integration (biometrics, security keys)</li>
                <li>Cross-origin credential sharing</li>
                <li>Prevent silent access after logout</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 text-sm">
              <strong>Why use it?</strong> The Credential Management API simplifies authentication flows,
              reduces password fatigue, and improves security by enabling passwordless authentication methods
              like WebAuthn. It provides a better user experience than traditional form-based login.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Credential Types */}
      <section>
        <h2 id="credential-types" className="text-2xl font-semibold mb-4">
          Credential Types
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PasswordCredential</CardTitle>
              <CardDescription>Traditional username/password authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Stores username and password pairs. The browser can auto-fill these credentials
                and provide one-tap sign-in experiences.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const credential = new PasswordCredential({
  id: 'user@example.com',
  password: 'secure-password',
  name: 'John Doe',
  iconURL: 'https://example.com/avatar.jpg'
});

await navigator.credentials.store(credential);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">FederatedCredential</CardTitle>
              <CardDescription>OAuth/OpenID Connect providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Stores identity provider information for federated sign-in (Google, Facebook, GitHub, etc.).
                Helps users remember which provider they used.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const credential = new FederatedCredential({
  id: 'user@example.com',
  provider: 'https://accounts.google.com',
  name: 'John Doe',
  iconURL: 'https://example.com/avatar.jpg'
});

await navigator.credentials.store(credential);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PublicKeyCredential (WebAuthn)</CardTitle>
              <CardDescription>Biometric and hardware key authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Enables passwordless authentication using biometrics (fingerprint, Face ID),
                platform authenticators (Windows Hello, Touch ID), or hardware keys (YubiKey).
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Registration
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverChallenge,
    rp: { name: "Example Corp" },
    user: {
      id: userIdBytes,
      name: "user@example.com",
      displayName: "John Doe"
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 }
    ]
  }
});

// Authentication
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: serverChallenge,
    allowCredentials: [/* credential IDs */]
  }
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core API */}
      <section>
        <h2 id="core-api" className="text-2xl font-semibold mb-4">
          Core API Methods
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">navigator.credentials.get()</CardTitle>
              <CardDescription>Retrieve stored credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Get password credential
const credential = await navigator.credentials.get({
  password: true,
  mediation: 'optional' // 'silent' | 'optional' | 'required'
});

// Get federated credential
const credential = await navigator.credentials.get({
  federated: {
    providers: [
      'https://accounts.google.com',
      'https://www.facebook.com'
    ]
  }
});

// Get WebAuthn credential
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: new Uint8Array(32),
    timeout: 60000
  }
});`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Mediation Options:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li><code className="text-xs bg-muted px-1 rounded">silent</code> - Auto sign-in without showing UI</li>
                  <li><code className="text-xs bg-muted px-1 rounded">optional</code> - Show UI if multiple credentials exist</li>
                  <li><code className="text-xs bg-muted px-1 rounded">required</code> - Always show account chooser</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">navigator.credentials.store()</CardTitle>
              <CardDescription>Save credentials for future use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Store after successful sign-in
const credential = new PasswordCredential({
  id: username,
  password: password
});

await navigator.credentials.store(credential);

// Or from form
const form = document.querySelector('form');
const credential = new PasswordCredential(form);
await navigator.credentials.store(credential);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">navigator.credentials.create()</CardTitle>
              <CardDescription>Create new credentials (primarily for WebAuthn)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Create WebAuthn credential
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverChallenge,
    rp: {
      name: "Example Corp",
      id: "example.com"
    },
    user: {
      id: new Uint8Array(16),
      name: "user@example.com",
      displayName: "John Doe"
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 },  // ES256
      { type: "public-key", alg: -257 } // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform", // or "cross-platform"
      userVerification: "required"
    },
    timeout: 60000
  }
});

// Send credential.id and credential.response to server`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">navigator.credentials.preventSilentAccess()</CardTitle>
              <CardDescription>Prevent automatic sign-in after logout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Call after user logs out
async function logout() {
  // Clear session
  await clearSession();

  // Prevent auto sign-in on next visit
  await navigator.credentials.preventSilentAccess();

  // User will see account chooser on next sign-in
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Implementation Guide */}
      <section>
        <h2 id="implementation-guide" className="text-2xl font-semibold mb-4">
          Implementation Guide
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Complete Sign-In Flow</CardTitle>
            <CardDescription>Step-by-step implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">1. Auto Sign-In (Page Load)</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs overflow-x-auto">
                    <code>{`async function autoSignIn() {
  try {
    const credential = await navigator.credentials.get({
      password: true,
      mediation: 'optional'
    });

    if (credential?.type === 'password') {
      // Sign in with credential
      const success = await signInToServer({
        username: credential.id,
        password: credential.password
      });

      if (success) {
        redirectToDashboard();
      }
    }
  } catch (error) {
    console.error('Auto sign-in failed:', error);
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Store After Sign-In</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs overflow-x-auto">
                    <code>{`async function handleSignIn(username, password) {
  // Authenticate with server
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    // Store credential
    const credential = new PasswordCredential({
      id: username,
      password: password,
      name: username
    });

    await navigator.credentials.store(credential);
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Handle Sign-Out</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs overflow-x-auto">
                    <code>{`async function handleSignOut() {
  // Clear session
  await fetch('/api/logout', { method: 'POST' });

  // Prevent auto sign-in next time
  await navigator.credentials.preventSilentAccess();

  // Redirect to login
  window.location.href = '/login';
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">✅ Do</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li>Use HTTPS for all credential operations</li>
                  <li>Call preventSilentAccess() after user-initiated logout</li>
                  <li>Handle credential retrieval errors gracefully</li>
                  <li>Provide fallback to traditional login forms</li>
                  <li>Store credentials immediately after successful authentication</li>
                  <li>Use appropriate mediation settings for your UX</li>
                  <li>Test across different browsers and devices</li>
                  <li>Implement WebAuthn for passwordless experiences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">❌ Don't</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li>Don't force users to use credential management</li>
                  <li>Don't store credentials without user consent</li>
                  <li>Don't use this API over HTTP (won't work)</li>
                  <li>Don't assume all browsers support all credential types</li>
                  <li>Don't skip error handling</li>
                  <li>Don't auto sign-in after explicit logout</li>
                  <li>Don't ignore security best practices for credential handling</li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 text-sm">
                <strong>Security Note:</strong> The Credential Management API provides a secure interface,
                but you must still follow security best practices on the server side. Never trust credentials
                without proper validation, use HTTPS, implement rate limiting, and follow OWASP guidelines.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Browser Support */}
      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Browser</th>
                      <th className="text-left p-2">Password/Federated</th>
                      <th className="text-left p-2">WebAuthn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Chrome</td>
                      <td className="p-2 text-green-500">51+</td>
                      <td className="p-2 text-green-500">67+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Edge</td>
                      <td className="p-2 text-green-500">79+</td>
                      <td className="p-2 text-green-500">18+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Firefox</td>
                      <td className="p-2 text-red-500">No</td>
                      <td className="p-2 text-green-500">60+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Safari</td>
                      <td className="p-2 text-orange-500">Partial (13+)</td>
                      <td className="p-2 text-green-500">13+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Opera</td>
                      <td className="p-2 text-green-500">38+</td>
                      <td className="p-2 text-green-500">54+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 text-sm space-y-2">
                <p><strong>Note:</strong> WebAuthn has broader support than password/federated credentials.</p>
                <p>For maximum compatibility, implement WebAuthn as your primary passwordless option.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Resources
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Credential Management API
                </a>
              </li>
              <li>
                <a
                  href="https://w3c.github.io/webappsec-credential-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Specification
                </a>
              </li>
              <li>
                <a
                  href="https://webauthn.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  WebAuthn Demo
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/security-credential-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  web.dev: Credential Management API
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/identity/one-tap/web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Google One Tap Sign-In
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
