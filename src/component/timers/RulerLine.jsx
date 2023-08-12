
import './css/TitleLined.css';



export function RulerLine({side}) {
let gradientId;
let gradientStops;

switch ('right') {
    case 'left':
        gradientId = 'gradientLeft';
        gradientStops = (
            <linearGradient id={gradientId} gradientTransform="rotate(0)">
                <stop offset="100%" stopColor="rgba(100,100,100,1)" />
                <stop offset="30%" stopColor="rgba(100,100,100,.4)" />
                <stop offset="0%" stopColor="rgba(100,100,100,0)" />
            </linearGradient>
        );
        break;
    case 'right':
        gradientId = 'gradientRight';
        gradientStops = (
            <linearGradient id={gradientId} gradientTransform="rotate(0)">
                <stop offset="0%" stopColor="rgba(100,100,100,0)" />
                <stop offset="70%" stopColor="rgba(100,100,100, .4)"/>
                <stop offset="100%" stopColor="rgba(100,100,100, 1)" />
            </linearGradient>
        );
}


    return (
        <>
            <defs>{gradientStops}</defs>
            <rect className="ruler-svg"  y="7" height="1" width="100%" fill={`url('#${gradientId}')`}/>
        </>
    )
}