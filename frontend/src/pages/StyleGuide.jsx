import "./StyleGuide.css";
import Divider from "../components/Divider";
import { LayoutDashboard, KanbanSquare, Clock, SlidersHorizontal } from 'lucide-react';<br />

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

export default function StyleGuide() {
	return (
		<div className="page-container style-guide">
			<h1>Style Guide</h1>
			<p className='tagline'>Welcome to the Style Guide page. This page defines the visual and voice guidelines for Flowboard.</p>
			
			<div className='section 1'>
				<h2>Brand</h2>
				<p>
				FlowBoard is a simple project planner built for developers who want to stay focused and make steady progress without overwhelm.
				The design emphasizes clarity, low friction, and straightforward workflows.
				</p>
			</div>

			<Divider />
			<div className='section 2'>
				<h2>Typography</h2>
				<h1>Heading 1</h1>
				<CodeBlock>
					font-family: 'Plus Jakarta Sans', sans-serif;<br />
					font-size: 50px (desktop), 46px (tablet), 44px (mobile)
				</CodeBlock>


				<h2>Heading 2</h2>
				<CodeBlock>
					font-family: 'Plus Jakarta Sans', sans-serif;<br />
					font-size: 40px (desktop), 36px (tablet), 34px (mobile)
				</CodeBlock>

				<h3>Heading 3</h3>
				<CodeBlock>
					font-family: 'Plus Jakarta Sans', sans-serif;<br />
					font-size: 36px (desktop), 32px (tablet), 30px (mobile)
				</CodeBlock>

				<p>Paragraph/normal text.</p>
				<CodeBlock>
					font-family: 'Inter', sans-serif;<br />
					font-size: 20px (desktop), 16px (tablet), 14px (mobile)
				</CodeBlock>
				<p className='tagline'>Tagline</p>
				<CodeBlock>
					font-family: 'Inter', sans-serif;<br />
					font-size: 20px (desktop), 16px (tablet), 14px (mobile);<br />
					font-style: italic;
				</CodeBlock>

				<p className="caption">Caption</p>
				<CodeBlock>
					font-family: 'Inter', sans-serif;<br />
					font-size: 16px (desktop), 12px (tablet), 10px (mobile);<br />
				</CodeBlock>
			</div>

			<Divider/>
			<div className='section 3'>
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
			</div>

			<Divider />
			<div className='section 4'>
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
			<div className='section 5'>
				<h2>Iconography</h2>
				<p>We use icons from the <a className="link" href="https://lucide.dev/icons/" target="_blank" rel="noreferrer">Lucide React library</a>.</p>
				<CodeBlock>
						width: 32px; <br />
						height: 32px; 	
				</CodeBlock>

			</div>
			<Divider />
			<div className='section 6'>
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
			<div className='section 7'>
				<h2>Forms</h2>
				<p>Forms are used across the application for user authentication and managing projects and tasks. All forms are displayed within a modal dialog.</p>
				<CodeBlock>
					{'<Modal isOpen={isOpen} onClose={() => closeModal(false)}>'}<br />
					{'Form content goes here'}<br />
					{'</Modal>'}
				</CodeBlock>
				<p><b>Use cases:</b></p>
				<ul>
					<li>Authentication (login, registration)</li>
					<li>Creating projects</li>
					<li>Adding tasks</li>
					<li>Editing projects and tasks</li>
				</ul>
			</div>

			<Divider />
			<div className='section 8'>
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