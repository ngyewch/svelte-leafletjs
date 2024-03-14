export default class EventBridge {
    entity;
    eventMap = {};
    constructor(entity, dispatch, events = []) {
        this.entity = entity;
        if (events) {
            events.forEach(event => {
                if (event in this.eventMap) {
                    return;
                }
                const handler = function (e) {
                    dispatch(event, e);
                };
                entity.on(event, handler);
                this.eventMap[event] = handler;
            });
        }
    }
    unregister() {
        Object.entries(this.eventMap).forEach(([event, handler]) => {
            this.entity.off(event, handler);
        });
    }
}
