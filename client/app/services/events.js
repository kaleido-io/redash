import { debounce } from 'lodash';

function Events($http) {
  this.events = [];

  this.post = debounce(() => {
    const events = this.events;
    this.events = [];

    // eslint-disable-next-line no-undef
    $http.post(`${API_ROOT}/events`, events);
  }, 1000);

  this.record = function record(action, objectType, objectId, additionalProperties) {
    const event = {
      action,
      object_type: objectType,
      object_id: objectId,
      timestamp: Date.now() / 1000.0,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
    };
    Object.assign(event, additionalProperties);
    this.events.push(event);

    this.post();
  };
}

export default function init(ngModule) {
  ngModule.service('Events', Events);
}
