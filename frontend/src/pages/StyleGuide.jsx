import "./StyleGuide.css";
import Divider from "../components/Divider";
import Alert from "../components/Alerts";

function ColorSwatch({ name, hex, usage }) {
	return (
		<div className='color-swatch'>
			<div className="color" style={{ backgroundColor: hex }}></div>
			<p>{name}</p>
			<p className="caption">{hex}<br /> {usage}</p>
		
		</div>
	)
}

function CodeBlock({children}) {
	return (
		<div className="code-block">
			<code>{children}</code>
		</div>
	)
}

function StyleGuideNav() {
	return (
		<nav className="style-guide-nav">
			<p>ON THIS PAGE</p>
			<ul>
				<li><a href="#brand">Brand</a></li>
				<li><a href="#typography">Typography</a></li>
				<li><a href="#color-palette">Color Palette</a></li>
				<li><a href="#voice">Voice</a></li>
				<li><a href="#iconography">Iconography</a></li>
				<li><a href="#imagery">Imagery</a></li>
				<li><a href="#forms">Forms</a></li>
				<li><a href="#alerts">Alerts</a></li>
				<li><a href="#buttons">Buttons</a></li>
				<li><a href="#spacings">Spacings</a></li>
				<li><a href="#dos-and-donts">Do's and Don'ts</a></li>
			</ul>
		</nav>
	)
}

export default function StyleGuide() {
	return (
		<div className="page-container style-guide">
			<StyleGuideNav />
			<h1>Style Guide</h1>
			<p className='tagline'>Welcome to the Style Guide page. This page defines the visual and voice guidelines for Flowboard.</p>
			
			<div className='section brand-section'>
				<h2>Brand</h2>
				<p>
				FlowBoard is a simple project planner built for developers who want to stay focused and make steady progress without overwhelm.
				The design emphasizes clarity, low friction, and straightforward workflows.
				</p>
			</div>

			<Divider />
			<div className='section typography-section'>
				<h2>Typography</h2>
				<p>FlowBoard uses <b>Plus Jakarta Sans</b> for headings and <b>Inter</b> for body text. All text is responsive using the <a className="link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp" target="_blank" rel="noreferrer">CSS clamp() function</a> to scale with screen size, left aligned, with each page containing an h1 element followed by a tagline.</p>
				<div className="typography-example row">
					<h1>Heading 1</h1>
					<CodeBlock>
						font-size: clamp(44px, 6vw, 50px);
						font-weight: 700;
					</CodeBlock>
				</div>


				<h2>Heading 2</h2>
				<CodeBlock>
					font-size: clamp(34px, 5vw, 40px);
					font-weight: 600;
				</CodeBlock>

				<h3>Heading 3</h3>
				<CodeBlock>
					font-size: clamp(28px, 4vw, 36px);
					font-weight: 500;
				</CodeBlock>

				<p>Paragraph/normal text.</p>
				<CodeBlock>
					font-size: clamp(14px, 2vw, 20px)
					f
				</CodeBlock>

				<p className='tagline'>Tagline</p>
				<CodeBlock>
					font-family: 'Inter', sans-serif;<br />
					font-size: clamp(14px, 2vw, 20px);
					font-style: italic;
				</CodeBlock>

			</div>

			<Divider/>
			<div className='section'>
				<h2>Color Palette</h2>
				<div className="color-palette">
					<ColorSwatch name="Frost" hex="#F2F4F8" usage="Primary background" />
					<ColorSwatch name="Cloud" hex="#E3E7EF" usage="Secondary background, surfaces" />
					<ColorSwatch name="Sky" hex="#bbcfeb" usage="Tertiary background, borders" />
					<ColorSwatch name="Primary Blue" hex="#4E7ADB" usage="Main brand color, primary actions" />
					<ColorSwatch name="Accent Blue" hex="#3D6CF5" usage="Secondary brand, interactive elements" />
					<ColorSwatch name="Midnight" hex="#344C8A" usage="Sidebar, dark UI elements" />
					<ColorSwatch name="Emerald" hex="#54D1B2" usage="Success, positive feedback" />
					<ColorSwatch name="Amber" hex="#FFC663" usage="Warning, caution states" />
					<ColorSwatch name="Charcoal" hex="#1C2331" usage="Primary text" />
					<ColorSwatch name="Slate" hex="#6A7489" usage="Secondary text, muted content" />
				</div>
				<p className="caption">Note: Tag colors may vary from the color palette</p>
			</div>

			<Divider />
			<div className='section'>
				<h2>Voice</h2>
				<p><b>Straightforward, Calm, and Minimal.</b></p>

				<p>
					We prioritize clarity over cleverness and usefulness over personality.
					Use short sentences and labels.
					Avoid metaphors, jokes, or marketing language.
					Avoid aggressive language and do not shame for incomplete work.
					Text should be action oriented, use verbs and be specific.
				</p>

			</div>

			<Divider />
			<div className='section'>
				<h2>Iconography</h2>
				<p>We use icons from the <a className="link" href="https://lucide.dev/icons/" target="_blank" rel="noreferrer">Lucide React library</a>.</p>

			</div>
			<Divider />
			<div className='section'>
				<h2>Imagery</h2>
				<p>Imagery should use a minimal, clean aesthetic that aligns with the brand.</p>
				<p><b>They should incorporate at least one of these brand colors:</b></p>
                <div className="color-palette">
                    <ColorSwatch name="Primary Blue" hex="#4E7ADB" usage="Main brand color, primary actions" />
                    <ColorSwatch name="Accent Blue" hex="#3D6CF5" usage="Secondary brand, interactive elements" />
                    <ColorSwatch name="Midnight" hex="#344C8A" usage="Dark UI elements" />
                </div>
            </div>

			<Divider />
			<div className='section'>
				<h2>Forms</h2>
				<p>Forms are used across the application for user authentication and managing projects and tasks. All forms are displayed within a modal dialog.</p>
				<CodeBlock>
					{'<Modal isOpen={isOpen} onClose={() => closeModal(false)}>'}<br />
					{'Form content goes here'}<br />
					{'</Modal>'}
				</CodeBlock>
			</div>

			<Divider />
			<div className='section'>
				<h2>Alerts</h2>
				<p>Alerts are used to give extra info to users if needed, such as success messages, warning messages, errors, and any additional info.</p>
				<div className="alerts-example">
					
					<Alert type="success">This is a success message.</Alert>
					
					<Alert type={"warning"}>This is a warning message.</Alert>				
					
					<Alert type={"error"}>This is a error message.</Alert>
					
					<Alert type={"info"}>This is additional information.</Alert>
				</div>

			</div>


			<Divider />
			<div className='section'>
				<h2>Buttons</h2>
				<div className="buttons">		
					<div className="button-example">
						<button className="btn-primary">Primary Button</button>
						<p>.btn-primary</p>
						<p className="caption">Main action button with brand accent background</p>
					</div>
					
					<div className="button-example">
						<button className="btn-ghost">Ghost Button</button>
						<p>.btn-ghost</p>
						<p className="caption">Transparent background with border, used for secondary actions</p>
					</div>
				</div>

			</div>

			<Divider />
			<div className='section 9'>
				<h2>Spacings</h2>
			<p>FlowBoard uses a consistent spacing system based on multiples of 8px:</p>
			<CodeBlock>
				8px (xs) - Small gaps, tight spacing<br />
				16px (sm) - Standard component padding<br />
				24px (md) - Section spacing<br />
				32px (lg) - Major section breaks<br />
				48px (xl) - Page-level spacing
			</CodeBlock>
			<p><b>Usage:</b></p>
			<ul>
				<li>Padding: Use 16px for most components</li>
				<li>Margins: Use 24px between sections</li>
				<li>Gaps: Use 8px-16px between inline elements</li>
			</ul>
			</div>
			
			<Divider />
			<div className='section 10'>
				<h2>Do's and Don'ts</h2>
				<p>Keep the interface clean and consistent. Use the brand palette, clear labels, and generous spacing so content feels calm and easy to scan.</p>
				<p><b>Do:</b></p>
				<ul>
					<li>Use concise, action-oriented labels</li>
					<li>Keep layouts simple and predictable</li>
					<li>Use consistent spacing and typography</li>
					<li>Prioritize clarity over decoration</li>
				</ul>
				<p><b>Don't:</b></p>
				<ul>
					<li>Overload screens with too many actions</li>
					<li>Use slang, jokes, or marketing language</li>
					<li>Mix too many colors or visual styles</li>
					<li>Hide key actions behind unclear icons</li>
				</ul>

			</div>
		</div>
	);
}