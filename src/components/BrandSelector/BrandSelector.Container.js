// Import redux methods
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import the Redux Actions and Component
import { Actions } from '../../states/BrandNumberState';
import BrandSelector from './BrandSelector';

// Define mapping functions
const mapStateToProps = (state) => {
  return {
    selectedBrand: state["outbound-dialer-brand"].BrandSelector.brandsNumber,
    numberList: state["outbound-dialer-brand"].BrandSelector.brandNumberList,    
    response_status: state["outbound-dialer-brand"].BrandSelector.response_status
  }
};

// Allows actions to be run from the component with updateBrands()
const mapDispatchToProps = (dispatch) => ({
    updateBrand: bindActionCreators(Actions.updateBrand, dispatch),
});

// Connect presentational component to Redux
export default connect(mapStateToProps,mapDispatchToProps)(BrandSelector);