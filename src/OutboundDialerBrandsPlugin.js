import React from 'react';
import { VERSION, Notifications } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import * as Flex from "@twilio/flex-ui";
import reducers, { namespace } from './states';
import BrandSelectorContainer from "./components/BrandSelector/BrandSelector.Container";
import { CustomNotifications } from './notifications';
import registerCustomNotifications from './notifications'
import { Actions } from './states/BrandNumberState';

const PLUGIN_NAME = 'OutboundDialerBrandsPlugin';

export default class OutboundDialerBrandsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    // Get the numbers from the asset
    this.dispatch(Actions.getPhoneNumbers());

    // Register the notification
    registerCustomNotifications(flex, manager); 
    
    // Add the dialpad component including the new brand selector component
    flex.OutboundDialerPanel.Content.add(
      <BrandSelectorContainer key="number-selector" />,
      { sortOrder: 1 }
    );
     
    // Update the outbound call logic to use the brand caller id from the new brand selector
    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {

      return new Promise((resolve, reject) => {
        // If brand caller ids populated and none are selected, create a notification instead of a call.
        if (!manager.store.getState()["outbound-dialer-brand"].BrandSelector.isConfirmed 
        && manager.store.getState()["outbound-dialer-brand"].BrandSelector.response_status === 'Okay'){          
          Notifications.showNotification(CustomNotifications.BrandNotification,null);
          reject("Brand is not selected. Please select a brand to make a call.");
        }
        
        // store the selected brand and default caller ID for the logic to make an outbound call below
        let brand_selected = String(manager.store.getState()["outbound-dialer-brand"].BrandSelector.brandsNumber)
        let default_caller_id = payload.callerId;

        // Either use the brand selector or the default caller id
        if (brand_selected != '') {
          resolve(brand_selected);
        } else {
          resolve(default_caller_id);
        }
      }).then((callerId) => {
        original({ ...payload, callerId: callerId });
      });

    });
    
  }

  dispatch = (f) => Flex.Manager.getInstance().store.dispatch(f);
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
