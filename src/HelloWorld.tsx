import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';



export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor1: zColor(),
	logoColor2: zColor(),
	up: z.number()
});



export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const startN = durationInFrames > 150 ? 0.01 : 0.005;
	const startMoveN = durationInFrames > 150 ? 0.05 : 0.02;
	const endStartN = durationInFrames > 150 ? 0.08 : 0.2;
	const endN = durationInFrames > 150 ? 0.1 : 0.3;


	const start = Math.floor(durationInFrames * startN)
	const startMove = Math.floor(durationInFrames * startMoveN)
	const endStart = Math.floor(durationInFrames * endStartN)
	const end = Math.floor(durationInFrames * endN)
	console.log(endStart, "end");

	// gray Box Left
	const heightBigger = spring({ frame, from: 200, to: 800, fps: fps, delay: startMove });
	const moveToLeft = spring({ frame, from: 260, to: 50, fps: fps, delay: startMove });
	const widthSmaller = interpolate(frame, [start, startMove, endStart], [200, 100, 30], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

// MiddleBox 
const widthMiddleSpring = spring({ frame, from: 0, to: 600, fps: fps, delay: endStart });
const middleBoxHeight = spring({ frame, from: 300, to: 800, fps: fps, delay: end });
const middleBoxHeightUp = spring({ frame, from: 0, to: -100, fps: fps, delay: end });


// Image
	const imageHeight = spring({ frame, from: 0, to: 700, fps: fps, delay: endStart + 3 }
		);

	return (
		<AbsoluteFill style={{
			backgroundColor: 'orange',
			display: 'flex',
			justifyContent: 'center'
		}}>

			<Img style={{
				width: 500, zIndex: 1,
				height: imageHeight,

				objectFit: 'cover',
				transform: `translate(${100}px, -100px)`
			}} src='https://firebasestorage.googleapis.com/v0/b/videos-dae03.appspot.com/o/Templates%2Fnature_athayao_romrif.jpg?alt=media&token=faa1a518-5478-4a21-8cd8-9cd8312531dd' />

			<div style={{
				fontSize: 30, background: 'grey',
				width: widthSmaller,
				position: 'absolute',
				transform: `translate(${moveToLeft}px, -100px)`,
				height: heightBigger,
				writingMode: 'horizontal-tb',
				zIndex: 1
			}}>
				dnasjdnjkasbdkjb
			</div>

			<div style={{
				position: 'absolute',
				transform: `translate(0px, ${middleBoxHeightUp}px)`,
				height: middleBoxHeight,
				alignSelf: 'center',
				width: widthMiddleSpring,
				background: 'green',
				boxShadow: '10px 15px 65px black',
			}} />



		</AbsoluteFill >

	);
};
