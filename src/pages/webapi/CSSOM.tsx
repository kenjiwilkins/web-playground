import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

interface CSSOMInterface {
  name: string
  description: string
  path?: string
  mdnUrl: string
}

const coreInterfaces: CSSOMInterface[] = [
  {
    name: 'CSSStyleSheet',
    description: 'Represents a single CSS stylesheet',
    path: '/webapi/cssom/CSSStyleSheet',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet'
  },
  {
    name: 'CSSRule',
    description: 'Base interface for all CSS rules',
    path: '/webapi/cssom/CSSRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSRule'
  },
  {
    name: 'CSSStyleDeclaration',
    description: 'Represents a CSS declaration block (style properties)',
    path: '/webapi/cssom/CSSStyleDeclaration',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration'
  },
  {
    name: 'CSSStyleRule',
    description: 'Represents a CSS style rule (selector + declarations)',
    path: '/webapi/cssom/CSSStyleRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule'
  },
  {
    name: 'StyleSheet',
    description: 'Base interface for stylesheets',
    path: '/webapi/cssom/StyleSheet',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet'
  },
  {
    name: 'StyleSheetList',
    description: 'Collection of StyleSheet objects',
    path: '/webapi/cssom/StyleSheetList',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList'
  },
  {
    name: 'CSSRuleList',
    description: 'Array-like object containing an ordered collection of CSSRule objects',
    path: '/webapi/cssom/CSSRuleList',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList'
  }
]

const ruleInterfaces: CSSOMInterface[] = [
  {
    name: 'CSSMediaRule',
    description: 'Represents a CSS @media rule',
    path: '/webapi/cssom/CSSMediaRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule'
  },
  {
    name: 'CSSKeyframesRule',
    description: 'Represents a CSS @keyframes rule',
    path: '/webapi/cssom/CSSKeyframesRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule'
  },
  {
    name: 'CSSKeyframeRule',
    description: 'Represents a single keyframe in a @keyframes rule',
    path: '/webapi/cssom/CSSKeyframeRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframeRule'
  },
  {
    name: 'CSSImportRule',
    description: 'Represents a CSS @import rule',
    path: '/webapi/cssom/CSSImportRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule'
  },
  {
    name: 'CSSFontFaceRule',
    description: 'Represents a CSS @font-face rule',
    path: '/webapi/cssom/CSSFontFaceRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSFontFaceRule'
  },
  {
    name: 'CSSPageRule',
    description: 'Represents a CSS @page rule',
    path: '/webapi/cssom/CSSPageRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSPageRule'
  },
  {
    name: 'CSSSupportsRule',
    description: 'Represents a CSS @supports rule',
    path: '/webapi/cssom/CSSSupportsRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSSupportsRule'
  },
  {
    name: 'CSSNamespaceRule',
    description: 'Represents a CSS @namespace rule',
    path: '/webapi/cssom/CSSNamespaceRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSNamespaceRule'
  },
  {
    name: 'CSSCounterStyleRule',
    description: 'Represents a CSS @counter-style rule',
    path: '/webapi/cssom/CSSCounterStyleRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSCounterStyleRule'
  },
  {
    name: 'CSSLayerBlockRule',
    description: 'Represents a CSS @layer block rule',
    path: '/webapi/cssom/CSSLayerBlockRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSLayerBlockRule'
  },
  {
    name: 'CSSLayerStatementRule',
    description: 'Represents a CSS @layer statement rule',
    path: '/webapi/cssom/CSSLayerStatementRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSLayerStatementRule'
  },
  {
    name: 'CSSConditionRule',
    description: 'Base interface for conditional CSS rules (@media, @supports)',
    path: '/webapi/cssom/CSSConditionRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSConditionRule'
  },
  {
    name: 'CSSGroupingRule',
    description: 'Base interface for rules that contain other rules',
    path: '/webapi/cssom/CSSGroupingRule',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSGroupingRule'
  }
]

const typedOMInterfaces: CSSOMInterface[] = [
  {
    name: 'CSSStyleValue',
    description: 'Base class for all CSS values in Typed OM',
    path: '/webapi/cssom/CSSStyleValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleValue'
  },
  {
    name: 'CSSNumericValue',
    description: 'Base class for numeric CSS values',
    path: '/webapi/cssom/CSSNumericValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSNumericValue'
  },
  {
    name: 'CSSUnitValue',
    description: 'Represents a single CSS numeric value with a unit',
    path: '/webapi/cssom/CSSUnitValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSUnitValue'
  },
  {
    name: 'CSSMathValue',
    description: 'Base class for mathematical CSS values (calc, min, max)',
    path: '/webapi/cssom/CSSMathValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSMathValue'
  },
  {
    name: 'CSSTransformValue',
    description: 'Represents CSS transform values',
    path: '/webapi/cssom/CSSTransformValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSTransformValue'
  },
  {
    name: 'CSSKeywordValue',
    description: 'Represents CSS keyword values',
    path: '/webapi/cssom/CSSKeywordValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSKeywordValue'
  },
  {
    name: 'CSSImageValue',
    description: 'Represents CSS image values',
    path: '/webapi/cssom/CSSImageValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSImageValue'
  },
  {
    name: 'CSSPositionValue',
    description: 'Represents CSS position values',
    path: '/webapi/cssom/CSSPositionValue',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSPositionValue'
  },
  {
    name: 'StylePropertyMap',
    description: 'Map interface for CSS properties (Typed OM)',
    path: '/webapi/cssom/StylePropertyMap',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMap'
  },
  {
    name: 'StylePropertyMapReadOnly',
    description: 'Read-only map interface for CSS properties',
    path: '/webapi/cssom/StylePropertyMapReadOnly',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly'
  }
]

const utilityInterfaces: CSSOMInterface[] = [
  {
    name: 'MediaQueryList',
    description: 'Stores information on a media query and handles events',
    path: '/webapi/cssom/MediaQueryList',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList'
  },
  {
    name: 'MediaQueryListEvent',
    description: 'Event object for media query changes',
    path: '/webapi/cssom/MediaQueryListEvent',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListEvent'
  },
  {
    name: 'Screen',
    description: 'Represents screen information',
    path: '/webapi/cssom/Screen',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Screen'
  },
  {
    name: 'VisualViewport',
    description: 'Represents the visual viewport',
    path: '/webapi/cssom/VisualViewport',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport'
  },
  {
    name: 'AnimationEvent',
    description: 'Represents events related to CSS animations',
    path: '/webapi/cssom/AnimationEvent',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent'
  },
  {
    name: 'TransitionEvent',
    description: 'Represents events related to CSS transitions',
    path: '/webapi/cssom/TransitionEvent',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent'
  },
  {
    name: 'FontFace',
    description: 'Represents a single usable font face',
    path: '/webapi/cssom/FontFace',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/FontFace'
  },
  {
    name: 'FontFaceSet',
    description: 'Interface for loading font faces and querying their status',
    path: '/webapi/cssom/FontFaceSet',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet'
  },
  {
    name: 'CSSTransition',
    description: 'Represents a CSS transition',
    path: '/webapi/cssom/CSSTransition',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSTransition'
  },
  {
    name: 'CSSAnimation',
    description: 'Represents a CSS animation',
    path: '/webapi/cssom/CSSAnimation',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSAnimation'
  }
]

const deprecatedInterfaces: CSSOMInterface[] = [
  {
    name: 'CSSValue',
    description: 'Deprecated - Use CSS Typed OM instead',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSValue'
  },
  {
    name: 'CSSPrimitiveValue',
    description: 'Deprecated - Use CSS Typed OM instead',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSPrimitiveValue'
  },
  {
    name: 'CSSValueList',
    description: 'Deprecated - Use CSS Typed OM instead',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/CSSValueList'
  }
]

function InterfaceList({ interfaces, showPath = true }: { interfaces: CSSOMInterface[], showPath?: boolean }) {
  return (
    <div className="grid gap-3">
      {interfaces.map((item) => (
        <div key={item.name} className="border rounded-lg p-4 hover:border-purple-500 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {showPath && item.path ? (
                <a
                  href={item.path}
                  className="text-base font-semibold text-blue-600 hover:underline"
                >
                  {item.name}
                </a>
              ) : (
                <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
              )}
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
            <a
              href={item.mdnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline whitespace-nowrap"
            >
              MDN <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CSSOM() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          CSS Object Model (CSSOM)
        </h1>
        <p className="text-muted-foreground">
          A set of APIs that allow manipulation of CSS from JavaScript, providing dynamic reading and modification of styles at runtime.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is CSSOM?</CardTitle>
            <CardDescription>Understanding the CSS Object Model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The <strong>CSS Object Model (CSSOM)</strong> is a set of APIs that enables JavaScript to read and manipulate CSS.
              It functions as the CSS equivalent of the Document Object Model (DOM), providing a programmatic interface to stylesheets,
              rules, and declarations.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Characteristics:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li>CSS values represented as untyped <code className="bg-background px-1 rounded">String</code> objects (traditional CSSOM)</li>
                <li>Typed CSS values available through CSS Typed OM (modern approach)</li>
                <li>Access to all stylesheets and CSS rules in the document</li>
                <li>Ability to read computed styles from elements</li>
                <li>Dynamic creation and modification of CSS rules</li>
              </ul>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-blue-500/10 border border-blue-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">Common Use Cases:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Dynamic theming and style switching</li>
                  <li>Reading element dimensions and positions</li>
                  <li>Responsive design with media queries</li>
                  <li>Animation and transition management</li>
                  <li>CSS-in-JS implementations</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">Related Technologies:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>CSS Typed OM API (type-safe CSS values)</li>
                  <li>CSS Properties and Values API (Houdini)</li>
                  <li>Web Animations API</li>
                  <li>Font Loading API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core Interfaces */}
      <section>
        <h2 id="core-interfaces" className="text-2xl font-semibold mb-4">
          Core Interfaces
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Fundamental CSSOM Interfaces</CardTitle>
            <CardDescription>
              Basic building blocks for working with stylesheets and rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterfaceList interfaces={coreInterfaces} />
          </CardContent>
        </Card>
      </section>

      {/* CSS Rules */}
      <section>
        <h2 id="css-rules" className="text-2xl font-semibold mb-4">
          CSS Rule Interfaces
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>At-Rule Representations</CardTitle>
            <CardDescription>
              Interfaces for different types of CSS rules (@media, @keyframes, @import, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterfaceList interfaces={ruleInterfaces} />
          </CardContent>
        </Card>
      </section>

      {/* CSS Typed OM */}
      <section>
        <h2 id="typed-om" className="text-2xl font-semibold mb-4">
          CSS Typed OM Interfaces
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Type-Safe CSS Value Manipulation</CardTitle>
            <CardDescription>
              Modern interfaces for working with CSS values as typed objects (see also: <a href="/webapi/typed-om" className="text-blue-600 hover:underline">CSS Typed OM API page</a>)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterfaceList interfaces={typedOMInterfaces} />
          </CardContent>
        </Card>
      </section>

      {/* Utility Interfaces */}
      <section>
        <h2 id="utility-interfaces" className="text-2xl font-semibold mb-4">
          Utility & Related Interfaces
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Supporting Interfaces</CardTitle>
            <CardDescription>
              Media queries, animations, fonts, and viewport information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterfaceList interfaces={utilityInterfaces} />
          </CardContent>
        </Card>
      </section>

      {/* Deprecated */}
      <section>
        <h2 id="deprecated" className="text-2xl font-semibold mb-4">
          Deprecated Interfaces
        </h2>
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle>⚠️ Avoid Using These</CardTitle>
            <CardDescription>
              Legacy interfaces - use CSS Typed OM instead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterfaceList interfaces={deprecatedInterfaces} showPath={false} />
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> These interfaces are deprecated and should not be used in new code.
                Use the <a href="/webapi/typed-om" className="text-blue-600 hover:underline">CSS Typed OM API</a> for type-safe CSS value manipulation instead.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Basic Examples */}
      <section>
        <h2 id="examples" className="text-2xl font-semibold mb-4">
          Basic Examples
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessing Stylesheets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Get all stylesheets
const sheets = document.styleSheets;

// Access a specific stylesheet
const firstSheet = sheets[0];

// Read CSS rules
const rules = firstSheet.cssRules;
for (let rule of rules) {
  console.log(rule.cssText);
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading Computed Styles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Get computed styles for an element
const element = document.getElementById('myElement');
const computed = window.getComputedStyle(element);

// Access specific properties
console.log(computed.color);
console.log(computed.width);
console.log(computed.display);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifying Inline Styles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Traditional string-based approach
element.style.color = 'red';
element.style.width = '100px';
element.style.backgroundColor = '#f0f0f0';

// Using cssText
element.style.cssText = 'color: red; width: 100px;';

// Using setProperty
element.style.setProperty('color', 'red', 'important');`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creating CSS Rules Dynamically</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Create a new style element
const style = document.createElement('style');
document.head.appendChild(style);

// Access the stylesheet
const sheet = style.sheet;

// Insert a new rule
sheet.insertRule('.dynamic { color: blue; }', 0);

// Delete a rule
sheet.deleteRule(0);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Working with Media Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Create a media query
const mediaQuery = window.matchMedia('(max-width: 600px)');

// Check if it matches
if (mediaQuery.matches) {
  console.log('Mobile view');
}

// Listen for changes
mediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    console.log('Switched to mobile');
  } else {
    console.log('Switched to desktop');
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Additional Resources
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  MDN: CSS Object Model (CSSOM) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Using_dynamic_styling_information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  MDN: Using dynamic styling information <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  MDN: Determining the dimensions of elements <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  MDN: Managing screen orientation <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://drafts.csswg.org/cssom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  W3C Specification: CSSOM <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
