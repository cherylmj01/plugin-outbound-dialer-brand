import React from "react";

import { StyledSelect, Caption } from "./BrandSelector.Styles";

import MenuItem from "@material-ui/core/MenuItem";
import { injectGlobal } from 'react-emotion';
import global from './global.css';

injectGlobal`
  ${global}
`;

// import * as Flex from "@twilio/flex-ui";

class BrandSelector extends React.Component {

    constructor(props){        
        super(props);
    }

    render() {        
        const { response_status } = this.props;

        // The choices of brands converted to a list
        let callerIds = this.props.numberList;
        let callerIdsArray = []
        for (let m in callerIds) {
            callerIdsArray.push(m)
        }

        // If an error is encountered , then don't load the component
        if (response_status === 'Error'){            
            return null;
        }
        //else load the component and Populate the choices of brands as a select tag
        else {
            return(
                <div>
                    <Caption
                    key="queue-select-caption"
                    className="Twilio-OutboundDialerPanel-QueueSelect-Caption">
                    Brand
                    </Caption>

                    <StyledSelect value={String(this.props.selectedBrand) || callerIdsArray[0]}
                                  onChange={(e) => this.props.updateBrand(e.target.value)}>
                            <MenuItem key="placeholder" value="placeholder" disabled>Select Brand</MenuItem>
                            {callerIdsArray.map( (element) => ( 
                            <MenuItem key={element} value={callerIds[element]} >
                            {element}
                            </MenuItem>
                            ))}
                    </StyledSelect>
                </div>
            );
        }
    }
};    

export default BrandSelector;

