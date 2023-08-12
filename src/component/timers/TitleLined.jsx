import { RulerLine } from './RulerLine';
import './css/TitleLined.css';



export function TitleLined({title, side}) {

    return(
        <div className="title">
            <span className="title-text">{title}</span>
            <div className="line-wraspper">
                {/*<hr className="title-divider" />*/}
                <svg className="title-divider" height="10" width="100%" xmlns="http://www.w3.org/2000/svg">
                    
                    <RulerLine side={side}/>
                </svg>
                
            </div>
            
        </div>)
}