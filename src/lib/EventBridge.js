export default class EventBridge {

    constructor(entity, dispatch, events = []) {
        this.entity = entity;

        this.eventHandlers = [];
        if (events) {
            const eventMap = {};
            events.forEach(event => {
                if (!(event in eventMap)) {
                    const handler = function (e) {
                        dispatch(event, e);
                    };
                    this.eventHandlers.push({
                        event: event,
                        handler: handler,
                    });
                    entity.on(event, handler);
                    eventMap[event] = handler;
                }
            });
        }
    }

    unregister() {
        this.eventHandlers.forEach(entry => {
            this.entity.off(entry.event, entry.handler);
        });
    }
}