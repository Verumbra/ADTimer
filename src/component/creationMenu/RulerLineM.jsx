
import './css/TitleLinedM.css';



export function RulerLineMenu({side}) {
let gradientId;
let gradientStops;

switch (side) {
    case 'left':
        gradientId = 'menu-gradientLeft';
        gradientStops = (
            <linearGradient id={gradientId} gradientTransform="rotate(0)">
                <stop offset="100%" stopColor="rgba(100,100,100,1)" />
                <stop offset="30%" stopColor="rgba(100,100,100,.4)" />
                <stop offset="0%" stopColor="rgba(100,100,100,0)" />
            </linearGradient>
        );
        break;
    case 'right':
        gradientId = 'menu-gradientRight';
        gradientStops = (
            <linearGradient id={gradientId} gradientTransform="rotate(0)">
                <stop offset="0%" stopColor="rgba(100,100,100,0)" />
                <stop offset="30%" stopColor="rgba(100,100,100, .4)"/>
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