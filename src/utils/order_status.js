//enum: ["initialized", "order_placed", "accepted", "cancelled", "kit_activated", "processing", "completed"],

const ORDER_STATUS_INIT = "initialized";
const ORDER_STATUS_REVIEW = "order_placed";
const ORDER_STATUS_ACCEPTED = "accepted";
const ORDER_STATUS_CANCELLED = "cancelled";
const ORDER_STATUS_ACTIVATED = "kit_activated";
const ORDER_STATUS_INPROCESS = "processing";
const ORDER_STATUS_COMPLETE = "completed";

// ['shipped', 'sample_recieved']
const KIT_STATUS_SHIPPED = "shipped";
const KIT_STATUS_SAMPLE_RECIEVED = "sample_recieved";

const status_constants = {
	ORDER_STATUS_INIT,
	ORDER_STATUS_REVIEW,
	ORDER_STATUS_ACCEPTED,
	ORDER_STATUS_CANCELLED,
	ORDER_STATUS_ACTIVATED,
	ORDER_STATUS_INPROCESS,
	ORDER_STATUS_COMPLETE,
	KIT_STATUS_SHIPPED,
	KIT_STATUS_SAMPLE_RECIEVED,
};

export default status_constants;
