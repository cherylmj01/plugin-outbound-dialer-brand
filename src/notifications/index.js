import * as Flex from '@twilio/flex-ui';

export default (flex, manager) => {
	registerCustomNotifications(flex, manager);
}

export const CustomNotifications = {
	BrandNotification: "BrandNotSelected",
	BrandErrorNotification: "BrandListNotConfigured",
	BrandLoadNotification: "BrandLoadNotification"
}

function registerCustomNotifications(flex, manager) {
	flex.Notifications.registerNotification({
		id: CustomNotifications.BrandNotification,
		type: Flex.NotificationType.error,
		content: "Brand is not selected. Please select a brand to make a call."
	});

	flex.Notifications.registerNotification({
		id: CustomNotifications.BrandLoadNotification,
		type: Flex.NotificationType.error,
		content: "The brand list for the outbound dialer was unable to load.",
		timeout: 20000
	});	
}