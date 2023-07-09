import ColourDiv from "./ColourDiv";
import './ColourContainer.css'


function ColourContainer({ palette }){
    
    const width = 100/palette.length
    if (palette == null) {
        return <div>API ERROR</div>;
    }
    return(
        <div className="container">

            {palette.map((element) => (
                <ColourDiv width={width} name={element.name} color={element.colour}/>
            ))}

        </div>
    )
}
export default ColourContainer;