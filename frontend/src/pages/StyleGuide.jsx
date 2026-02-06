import "./StyleGuide.css";
import Divider from "../components/Divider";

function ColorSwatch({ name, hex, usage }) {
	return (
		<div className='color-swatch'>
			

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
				<div className="color-swatch">
					<div style={{ backgroundColor: '#F2F4F8' }}></div>
					<p>--bg-base</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#E3E7EF' }}></div>
					<p>--bg-surface</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#bbcfeb' }}></div>
					<p>--bg-intermediate</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#4E7ADB' }}></div>
					<p>--brand-primary</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#3D6CF5' }}></div>
					<p>--brand-accent</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#344C8A' }}></div>
					<p>--ui-sidebar</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#54D1B2' }}></div>
					<p>--status-success</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#FFC663' }}></div>
					<p>--status-warning</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#1C2331' }}></div>
					<p>--text-primary</p>
				</div>
				<div className="color-swatch">
					<div style={{ backgroundColor: '#6A7489' }}></div>
					<p>--text-muted</p>
				</div>
				</div>
			</div>

			<Divider />
			<div className='section 4'>
				<h2>Voice</h2>
			</div>

			<Divider />
			<div className='section 5'>
				<h2>Iconography</h2>
			</div>

			<Divider />
			<div className='section 6'>
				<h2>Imagery</h2>
			</div>

			<Divider />
			<div className='section 7'>
				<h2>Forms</h2>
			</div>

			<Divider />
			<div className='section 8'>
				<h2>Buttons</h2>
			</div>

			<Divider />
			<div className='section 9'>
				<h2>Spacings</h2>
			</div>
			
			<Divider />
			<div className='section 10'>
				<h2>Do's and Don'ts</h2>
			</div>
		</div>
	);
}