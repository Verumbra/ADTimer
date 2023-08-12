import { RulerLineMenu } from './RulerLineM';
import './css/TitleLinedM.css';



export function TitleLinedMenu({className,children,side,size,wieght}) {

    return(
        <div className={`menu-title ${className}`}>
            <span className={`menu-title-text ${size} ${wieght}`}>{children}</span>
            <div className="menu-line-wraspper">
                {/*<hr className="title-divider" />*/}
                <svg className={`menu-title-divider ${size}`} height="10" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                         <linearGradient id="menu-gradient" gradientTransform="rotate(0)">
                           <stop offset="0%" stopColor="rgba(100,100,100,1)" />
                            <stop offset="30%" stopColor="rgba(100,100,100, .4)"/>
                            <stop offset="100%" stopColor="rgba(100,100,100, 0)" />
                        </linearGradient>
                    </defs>
                    <rect className="ruler-svg"  y="7" height="2" width="100%" fill="url(#menu-gradient)"/>
                    
                </svg>
                
            </div>
            
        </div>)
}