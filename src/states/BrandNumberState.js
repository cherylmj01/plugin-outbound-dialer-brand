import { Notifications } from '@twilio/flex-ui';
import { CustomNotifications } from '../notifications';

const UPDATE_DIALER_BRAND = "UPDATE_BRAND";
const SET_DIALER_DESTINATION = "DIALER_DESTINATION";
const GET_PHONE_NUMBER = "GET_PHONE_NUMBER";

const initialState = {
    brandsNumber: '',
    isConfirmed: false,
    response_status: 'Pending',
    brandNumberList: {},
    error: ''
  };

  function getBrandNumberList() {
    return fetch(process.env.REACT_APP_BRAND_NUMBERS_JSON_URL)
    .then((response) => response.json())
    .catch((err) => {
      return `Error: ${err}`;
    });
  }
  
  export class Actions {

    static updateBrand = (brand) => ({
      type: UPDATE_DIALER_BRAND,
      payload: brand,
    });

     static setToBrand = (brand) => ({
      type: SET_DIALER_DESTINATION,
      payload: brand,
    });

    static getPhoneNumbers = () => ({
      type: GET_PHONE_NUMBER,
      payload: getBrandNumberList(),
    })
  }

  export function reduce(state = initialState, action) {
  
    switch (action.type){
      
      case UPDATE_DIALER_BRAND: {
        return {
          ...state,
          brandsNumber: action.payload,
          isConfirmed: true,
        };
      }

      case SET_DIALER_DESTINATION: {
        return {
          ...state,
          tobrandsNumber: action.payload,
        };
      }

      case `${GET_PHONE_NUMBER}_PENDING`: {
        return state;
      }

      case `${GET_PHONE_NUMBER}_FULFILLED`: {
        if (String(action.payload).startsWith('Error: ')) {
          Notifications.showNotification(CustomNotifications.BrandLoadNotification, null)
          return {
            ...state,
            error: action.payload,
            response_status: 'Error'
          };
        } 
        else {
          return {
            ...state,
            brandNumberList: action.payload,
            response_status: 'Okay'
          };
        } 
      }

      case `${GET_PHONE_NUMBER}_REJECTED`: {
        Notifications.showNotification(CustomNotifications.BrandLoadNotification, null)
        return {
          ...state,
          error: action.payload.error,
          response_status: 'Error'
        };
      }
   
      default:
        return state;      
    }
  }
